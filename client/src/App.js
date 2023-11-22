import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [showStartButton, setShowStartButton] = useState(true);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalScore, setModalScore] = useState(0);
  const { width, height } = useWindowSize();
  const baseURL =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_BACKEND_URL_LOCAL
      : process.env.REACT_APP_BACKEND_URL_PROD;

  function getEmojiForIndex(index) {
    switch (index) {
      case 0:
        return "🔶";
      case 1:
        return "🟢";
      case 2:
        return "⚪";
      case 3:
        return "🟥";
      default:
        return "❓";
    }
  }

  const startNewRound = async () => {
    setLoading(true);
    try {
      console.log(baseURL);
      const response = await axios.post(`${baseURL}/api/start-round`);
      // const response = await axios.post(`${baseURL}/api/start-round`);

      const { characters, selectedCharacter } = response.data;

      const allOptions = characters.map((character) => character.name);
      const shuffledOptions = shuffleArray(allOptions);
      const optionsWithCorrectAnswer = shuffledOptions.slice(0, 3);
      optionsWithCorrectAnswer.push(selectedCharacter.name);

      setOptions(shuffleArray(optionsWithCorrectAnswer));
      setSelectedCharacter(selectedCharacter);

      setShowStartButton(false);

      setIsAnswerCorrect(null);
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
      }

      setIsAnswerCorrect(isCorrect);

      setTimeout(() => {
        setQuestionCounter((prevCounter) => prevCounter + 1);

        if (questionCounter === 9) {
          const finalScore = score + (isCorrect ? 1 : 0);
          setModalScore(finalScore);
          setShowModal(true);
        } else {
          startNewRound();
        }

        setIsAnswerCorrect(null);
      }, 2000);
    } catch (error) {
      console.error("Error handling answer:", error);
      setError("Error handling answer");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAgain = () => {
    startNewRound();
    setScore(0);
    setQuestionCounter(0);
    setShowModal(false);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  useEffect(() => {
    if (questionCounter === 10) {
      setModalScore(score);
      setShowModal(true);
    }
  }, [questionCounter, score]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="full-page">
      <div className="title-container">
        <h1>Guess the Disney Character</h1>
        <h2>Who is this character?</h2>
      </div>

      {showStartButton && (
        <button onClick={startNewRound}>Start New Round</button>
      )}

      {selectedCharacter && !showStartButton && (
        <>
          <div className="imageAnswerDiv">
            <ul>
              <li className="score">
                <h4>Score:</h4>
                <div className="score-container">{score}</div>
              </li>
              <li>
                <img
                  src={selectedCharacter.imageUrl}
                  alt={selectedCharacter.name}
                  style={{ width: "350px", maxHeight: "450px" }}
                />
              </li>
              <li>
                <h4>Questions:</h4>
                <div className="questions-container">
                  {questionCounter} /10{" "}
                </div>
              </li>
            </ul>
          </div>

          {isAnswerCorrect !== null && (
            <div className="answer-feedback">
              {isAnswerCorrect ? (
                <p className="correct-answer">Correct!</p>
              ) : (
                <p className="incorrect-answer">
                  Incorrect! The correct answer is:
                  <p>{selectedCharacter.name}</p>
                </p>
              )}
            </div>
          )}

          <ul className="answerButtonContainer">
            {options.map((option, index) => (
              <li key={index}>
                <button
                  className={`answerButtons button${index + 1}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {getEmojiForIndex(index)} {option}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {showModal && (
        <>
          <div className="modal-overlay">
            <div className="modal">
              <Confetti width={width} height={height} />
              <p className="modal-text">Your final score is:</p>
              <p>
                <div className="modal-score-container">{modalScore}</div>
              </p>
              <button className="play-again-button" onClick={handlePlayAgain}>
                Play Again
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
