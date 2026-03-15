import Offer from "../models/offers.js";

/* ======================================
   GET ALL OFFERS (WITH CATEGORY FILTER)
====================================== */
export const getOffers = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = { isActive: true };

    if (category) {
      filter.category = category;
    }

    const offers = await Offer.find(filter).sort({ createdAt: -1 });

    res.json(offers);
  } catch (error) {
    console.error("Get Offers Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================
   GET SINGLE OFFER
====================================== */
export const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.json(offer);
  } catch (error) {
    console.error("Get Offer By ID Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ======================================
   APPLY OFFER
====================================== */
export const applyOffer = async (req, res) => {
  try {
    const { couponCode, bookingAmount } = req.body;

    const offer = await Offer.findOne({
      couponCode,
      isActive: true
    });

    if (!offer) {
      return res.status(400).json({ message: "Invalid Coupon Code" });
    }

    // Check validity
    const now = new Date();

    if (
      offer.validity?.startDate &&
      now < offer.validity.startDate
    ) {
      return res.status(400).json({ message: "Offer not started yet" });
    }

    if (
      offer.validity?.endDate &&
      now > offer.validity.endDate
    ) {
      return res.status(400).json({ message: "Offer expired" });
    }

    // Check minimum booking amount
    if (
      bookingAmount < offer.eligibility?.minBookingAmount
    ) {
      return res.status(400).json({
        message: `Minimum booking amount ₹${offer.eligibility.minBookingAmount}`
      });
    }

    // Calculate discount
    let discountAmount = 0;

    if (offer.discount.type === "percentage") {
      discountAmount =
        (bookingAmount * offer.discount.value) / 100;

      if (offer.discount.maxCap) {
        discountAmount = Math.min(
          discountAmount,
          offer.discount.maxCap
        );
      }
    } else {
      discountAmount = offer.discount.value;
    }

    res.json({
      success: true,
      discountAmount,
      finalAmount: bookingAmount - discountAmount
    });

  } catch (error) {
    console.error("Apply Offer Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
