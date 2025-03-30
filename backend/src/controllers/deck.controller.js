import Deck from "../models/Deck.models.js";
import Card from "../models/Cards.models.js";
import { deckSchema } from "../schemas/deckSchema.js";
import mongoose from "mongoose";

export const createDeck = async (req, res) => {

    try {
      // Validate request body
      const parsedBody = deckSchema.parse(req.body);
      console.log(parsedBody)
      
  
      // Create new deck
      const newdeck = new Deck(parsedBody);
      await newdeck.save();
  
      return res.status(201).json({
        message: "deck created successfully",
        deck: newdeck,
      });
    } catch (error) {
      console.log("error from createdeck")
      console.log(error)
      
      
      return res.status(400).json({
        message: error.errors || "Invalid data",
      });
    }
  };


 export const getAllDecks = async (req,res) => {
  try {
      const decks = await Deck.find() // Populate user details
     return res.status(200).json(decks);
  } catch (error) {
     return res.status(500).json({ error: "Failed to fetch decks" });
  }
};

export const getOneDeck = async (req,res) => {
  try {
    const { id } = req.params;
    const objectId = new mongoose.Types.ObjectId(id);

    // Find the deck by ID
    const deck = await Deck.findById(objectId);
    if (!deck) {
        return res.status(404).json({ message: "Deck not found" });
    }
    // Find all cards that belong to this deck
    const cards = await Card.find({ deckName: objectId });
    console.log( cards)
    
    res.status(200).json({
        deck,
        cards,
    });
} catch (error) {
  console.log(error)
  
    res.status(500).json({ message: "Server Error", error });
}
};