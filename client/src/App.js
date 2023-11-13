import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [questionCounter, setQuestionCounter] = useState(0);

  const startNewRound = async () => {
    setLoading(true);
    try {
      // Reset the score to 0 and question counter to 0 when starting a new round
      // setScore(0);
      // setQuestionCounter(0);
      const response = await axios.post(
        "http://localhost:5001/api/start-round"
      );
      const { characters, selectedCharacter } = response.data;

      const allOptions = characters.map((character) => character.name);
      const shuffledOptions = shuffleArray(allOptions);
      const optionsWithCorrectAnswer = shuffledOptions.slice(0, 3);
      optionsWithCorrectAnswer.push(selectedCharacter.name);

      setOptions(shuffleArray(optionsWithCorrectAnswer));
      setSelectedCharacter(selectedCharacter);
    } catch (error) {
      console.error("Error starting a new round:", error);
      setError("Error starting a new round");
    } finally {
      setLoading(false);
    }
  };

  const shuffleArray = (array) => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleOptionClick = async (selectedOption) => {
    setLoading(true);

    try {
      const isCorrect = selectedOption === selectedCharacter.name;

      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
        alert("Correct!");
      } else {
        alert(`Incorrect! The correct answer is: ${selectedCharacter.name}`);
      }

      setQuestionCounter((prevCounter) => prevCounter + 1);

      if (questionCounter === 4) {
        alert(`You answered 5 questions. Your score is: ${score}`);

        startNewRound();
        setScore(0);
        setQuestionCounter(0);
      } else {
        await axios.post("http://localhost:5001/api/submit-answer", {
          selectedCharacter,
          userAnswer: selectedOption,
        });

        startNewRound();
      }
    } catch (error) {
      console.error("Error handling answer:", error);
      setError("Error handling answer");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    startNewRound();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Guess the Disney Character</h1>
      <p>Score: {score}</p>
      {selectedCharacter && (
        <>
          <p>Who is this character?</p>
          <img
            src={selectedCharacter.imageUrl}
            alt={selectedCharacter.name}
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
          <ul>
            {options.map((option, index) => (
              <li key={index}>
                <button onClick={() => handleOptionClick(option)}>
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      <button onClick={startNewRound}>Start New Round</button>
    </div>
  );
}

export default App;
