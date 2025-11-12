import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import qbank from './components/questionbank';
import './App.css';
import Question from './components/Question';
import Score from './components/Score';

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timer, setTimer] = useState(10); // Set to 10 seconds
  const [name, setName] = useState("");

  // Countdown timer effect
<<<<<<< HEAD
    // Countdown timer effect
=======
>>>>>>> 40806f2d610633544774e8bb256498882c3cbff4
  useEffect(() => {
    if (quizStarted && !quizEnd && timer > 0) {
      const countdown = setTimeout(() => {
        setTimer(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(countdown);
    }

    if (timer === 0 && !quizEnd && quizStarted) {
      handleNextQuestion();
    }
<<<<<<< HEAD

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, quizEnd, quizStarted]);  // Suppress warning about handleNextQuestion
=======
  }, [timer, quizEnd, quizStarted]);
>>>>>>> 40806f2d610633544774e8bb256498882c3cbff4

  // Save score to localStorage once quiz ends
  useEffect(() => {
    if (quizEnd) {
      const leaderboard = JSON.parse(localStorage.getItem("quiz-leaderboard")) || [];
      leaderboard.push({ name, score });
      localStorage.setItem("quiz-leaderboard", JSON.stringify(leaderboard));
    }
<<<<<<< HEAD
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizEnd, name, score]); // Added missing dependencies

=======
  }, [quizEnd]);
>>>>>>> 40806f2d610633544774e8bb256498882c3cbff4

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    checkAnswer();
    handleNextQuestion();
  };

  const checkAnswer = () => {
    if (selectedOption === qbank[currentQuestion].answer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < qbank.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
      setTimer(10); // Reset to 10 seconds per your preference
    } else {
      setQuizEnd(true);
    }
  };

  const startQuiz = () => {
    if (name.trim() === "") {
      alert("Please enter your name to start the quiz!");
      return;
    }
    setQuizStarted(true);
  };

  return (
    <div className="App d-flex flex-column align-items-center justify-content-center">
      <h1 className="quizify-title">Quizify</h1>

      {!quizStarted ? (
        <div className="welcome-screen text-center mt-4">
          <h3>Welcome!</h3>
          <input
            type="text"
            placeholder="Enter your name"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn btn-success" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      ) : !quizEnd ? (
        <>
          <h5 className="mt-3">Time Left ⏱️: {timer}s</h5>
          <Question
            question={qbank[currentQuestion]}
            selectedOption={selectedOption}
            onOptionChange={handleOptionChange}
            onSubmit={handleFormSubmit}
          />
        </>
      ) : (
        <Score score={score} name={name} />
      )}
    </div>
  );
};

export default App;
