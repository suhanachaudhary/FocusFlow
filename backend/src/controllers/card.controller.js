import Card from "../models/Cards.models.js";

import { cardSchema } from "../schemas/cardSchema.js";

export const createCard = async (req, res) => {

    try {
      // Validate request body
      const parsedBody = cardSchema.parse(req.body);
      console.log("Parsed body:", parsedBody);      
  
      // Create new card
      const newCard = new Card(parsedBody);
      await newCard.save();
  
      return res.status(201).json({
        message: "Card created successfully",
        card: newCard,
      });
    } catch (error) {
      console.log("error from createCard")
      console.log(error)
      
      
      return res.status(400).json({
        message: error.errors || "Invalid data",
      });
    }
  };


  export const getFlashcardDetails = async (req, res) => {
    try {
      const { deckid, id } = req.params;
  
      // Find the flashcard in the deck
      const flashcard = await Card.findOne({ _id: id, deckName: deckid });
  
      if (!flashcard) {
        return res.status(404).json({ message: "Flashcard not found" });
      }
  
      res.status(200).json(flashcard);
    } catch (error) {
      console.error("Error fetching flashcard:", error);
      res.status(500).json({ message: "Server error" });
    }
  };