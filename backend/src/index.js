import express from 'express'
import cardRoutes from "./routes/card-route.js"
import deckRoutes from "./routes/deck-route.js"
import dotenv from "dotenv";
import connectDB from "./db/index.js"; 
dotenv.config();
const app = express()
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("home page")
})

app.use("/api/flash/createcard",cardRoutes)
app.use("/api/flash/createDeck",deckRoutes)

app.listen(3000,()=>{
    console.log("app running at port 3000")
    
    // db connection
    connectDB();
})