import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cards from "./dbCards.js";

// App Config

const app = express();
const PORT = process.env.PORT || 8000;
const connection_url = `mongodb+srv://finsoncoutinho:admin123@cluster0.rdyl3.mongodb.net/tinderDB?retryWrites=true&w=majority`;

// Middlewares
app.use(express.json());
app.use(cors());

// DB config
mongoose.connect(connection_url);

// API Endpoint
app.get("/", (req, res) => res.status(200).send("Hellooo"));

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listener
app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}`);
});
