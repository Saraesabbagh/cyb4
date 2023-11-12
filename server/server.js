const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5001;
app.use(cors());
app.use(express.json()); // Add this line to parse JSON in the request body

let pageCounter = 1;

app.get("/api/disney-characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.disneyapi.dev/character?page=${pageCounter}`
    );
    res.json(response.data);
    console.log(response.data);

    pageCounter++;
  } catch (error) {
    console.error("Error fetching Disney characters:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/start-round", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.disneyapi.dev/character?page=${pageCounter}`
    );
    const characters = response.data.data;
    const selectedCharacter = getRandomCharacter(characters);

    res.json({ characters, selectedCharacter });
    console.log(characters);

    pageCounter++;
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

function getRandomCharacter(characters) {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
