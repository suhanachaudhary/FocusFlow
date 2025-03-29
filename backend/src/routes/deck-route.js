import express from "express";
import { protectFlash } from "../middlewares/protectFlash.js";
import { createDeck, getAllDecks , getOneDeck } from "../controllers/deck.controller.js";
const router = express.Router()

// router.get("/create",protectFlash,createDeck)
router.post("/create",createDeck)
router.get("/all",getAllDecks)
router.get("/one/:id",getOneDeck)

export default router