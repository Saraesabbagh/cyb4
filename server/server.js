const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5001;

const allowedOrigins = [
  "http://localhost:3000", // for local development
  "https://cyb4-l0xv0ecfj-saraesabbagh.vercel.app", // replace with your Vercel domain
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());

app.get("/api/disney-characters", async (req, res) => {
  try {
    const randomPage = getRandomPage();
    const response = await axios.get(
      `https://api.disneyapi.dev/character?page=${randomPage}`
    );
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching Disney characters:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/start-round", async (req, res) => {
  try {
    const randomPage = getRandomPage();
    const response = await axios.get(
      `https://api.disneyapi.dev/character?page=${randomPage}`
    );
    const characters = response.data.data;
    const selectedCharacter = getRandomCharacter(characters);

    res.json({ characters, selectedCharacter });
    console.log(characters);
  } catch (error) {
    console.error("Error starting a new round:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/submit-answer", (req, res) => {
  const { selectedCharacter, userAnswer } = req.body;
  const isCorrect = selectedCharacter.name === userAnswer;
  const score = isCorrect ? 1 : 0;

  res.json({ score });
});

function getRandomPage() {
  //
  return Math.floor(Math.random() * 149) + 1;
}

function getRandomCharacter(characters) {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
