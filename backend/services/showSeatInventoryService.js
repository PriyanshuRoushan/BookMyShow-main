import Screen from "../models/screen.js";
import ShowSeat from "../models/showSeats.js";

// A screen layout is a reusable template. A ShowSeat is the show-specific
// inventory that may be held or booked without affecting another movie/show.
export async function ensureShowSeatInventory(show, { session } = {}) {
  const screenQuery = Screen.findById(show.screenID).select("theatreID seatLayout");
  if (session) screenQuery.session(session);
  const screen = await screenQuery;

  if (!screen) {
    throw Object.assign(new Error("The screen assigned to this show no longer exists"), { statusCode: 422 });
  }
  if (String(screen.theatreID) !== String(show.theatreID)) {
    throw Object.assign(new Error("The selected screen does not belong to this theatre"), { statusCode: 422 });
  }

  const seenSeatCodes = new Set();
  const operations = [];

  for (const section of screen.seatLayout || []) {
    for (const row of section.rows || []) {
      for (const number of row.seats || []) {
        if (number === null || number === undefined) continue;

        const seatCode = `${row.rowLabel}${number}`;
        if (seenSeatCodes.has(seatCode)) {
          throw Object.assign(new Error(`Duplicate seat ${seatCode} in this screen layout`), { statusCode: 422 });
        }
        seenSeatCodes.add(seatCode);

        operations.push({
          updateOne: {
            filter: { showID: show._id, seatCode },
            update: {
              $setOnInsert: {
                showID: show._id,
                theatreID: show.theatreID,
                screenID: show.screenID,
                movieId: show.movieId,
                seatCode,
                row: row.rowLabel,
                seatNumber: String(number),
                category: section.category,
                price: section.price,
                status: "AVAILABLE",
              },
            },
            upsert: true,
          },
        });
      }
    }
  }

  if (!operations.length) {
    throw Object.assign(new Error("This screen has no seats configured"), { statusCode: 422 });
  }

  try {
    await ShowSeat.bulkWrite(operations, { ordered: false, ...(session ? { session } : {}) });
  } catch (error) {
    // Concurrent requests can both try to create the same initial inventory.
    // The unique showID + seatCode index leaves one valid copy in that case.
    if (error?.code !== 11000 && !error?.writeErrors?.every((item) => item.code === 11000)) throw error;
  }
}
