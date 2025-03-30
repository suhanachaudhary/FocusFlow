import express from "express";
import { protectFlash } from "../middlewares/protectFlash.js";
import { createCard  , getFlashcardDetails } from "../controllers/card.controller.js";
const router = express.Router()

// router.get("/create",protectFlash,createCard)
router.post("/create",createCard)
router.get("/deck/:deckid/card/:id", getFlashcardDetails);

export default router