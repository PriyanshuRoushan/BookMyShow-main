const BASE_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:3001/api";

/* ==============================
   GET ALL OFFERS
============================== */
export const fetchAllOffers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/offers`);

    if (!res.ok) {
      throw new Error("Failed to fetch offers");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching offers:", error);
    return [];
  }
};


/* ==============================
   GET OFFERS BY CATEGORY
============================== */
export const fetchOffersByCategory = async (category) => {
  try {
    const res = await fetch(
      `${BASE_URL}/offers?category=${encodeURIComponent(category)}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch category offers");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching category offers:", error);
    return [];
  }
};


/* ==============================
   APPLY OFFER
============================== */
export const applyOffer = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/offers/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }

    return await res.json();
  } catch (error) {
    console.error("Error applying offer:", error);
    return { success: false, message: error.message };
  }
};
