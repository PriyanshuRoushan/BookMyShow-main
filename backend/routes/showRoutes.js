import express from "express";
import { getShows } from "../controllers/showController.js";

const router = express.Router();

router.get("/", getShows);

export default router;
