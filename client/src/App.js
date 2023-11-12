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

      // Fetch new data for the next round
      const response = await axios.post(
        "http://localhost:5001/api/start-round"
      );
      const { characters, selectedCharacter } = response.data;

      // Include the correct answer in the options
      const allOptions = characters.map((character) => character.name);
      const shuffledOptions = shuffleArray(allOptions);
      const optionsWithCorrectAnswer = shuffledOptions.slice(0, 3); // Choose the first 3
      optionsWithCorrectAnswer.push(selectedCharacter.name); // Add the correct answer

      // Set the state for the new round
      setOptions(shuffleArray(optionsWithCorrectAnswer));
      setSelectedCharacter(selectedCharacter);
    } catch (error) {
      console.error("Error starting a new round:", error);
      setError("Error starting a new round");
    } finally {
      // Reset loading state
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
      // Check if the selected option is correct before making the API call
      const isCorrect = selectedOption === selectedCharacter.name;

      // If the answer is correct, increment the score
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
        alert("Correct!");
      } else {
        alert(`Incorrect! The correct answer is: ${selectedCharacter.name}`);
      }

      // Increment the question counter
      setQuestionCounter((prevCounter) => prevCounter + 1);

      // If the user has answered 5 questions, reveal the score
      if (questionCounter === 4) {
        alert(`You answered 5 questions. Your score is: ${score}`);
        // Start a new round after revealing the score

        startNewRound();
        setScore(0);
        setQuestionCounter(0);
      } else {
        // Make the API call to submit the answer
        await axios.post("http://localhost:5001/api/submit-answer", {
          selectedCharacter,
          userAnswer: selectedOption,
        });

        // Start a new round after submitting the answer
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
    // Start a new round when the component mounts
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
