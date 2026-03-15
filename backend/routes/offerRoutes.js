import express from "express";
import {
  getOffers,
  getOfferById,
  applyOffer
} from "../controllers/offerController.js";

const router = express.Router();

/* ===============================
   GET ALL OFFERS
   /api/offers
================================= */
router.get("/", getOffers);

/* ===============================
   GET SINGLE OFFER
   /api/offers/:id
================================= */
router.get("/:id", getOfferById);

/* ===============================
   APPLY OFFER
   /api/offers/apply
================================= */
router.post("/apply", applyOffer);

export default router;
