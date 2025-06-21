// src/components/Score.js
import React, { useEffect, useState } from 'react';
import '../App.css';

const Score = ({ score, name }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("quiz-leaderboard")) || [];
    const sorted = data.sort((a, b) => b.score - a.score);
    setLeaderboard(sorted);
  }, []);

  return (
    <div className="score-container text-center mt-4">
      <h2 className="congrats">🎉 Well done, {name}!</h2>
     <h4 className="your-score">
        Your Score is : <span>{score}</span>
      </h4>

      <h3 className="leaderboard-title mt-4">🏆 Leaderboard</h3>
      <div className="leaderboard-wrapper">
        <table className="table leaderboard-table table-striped table-hover table-bordered">
          <thead className="table-success">
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index} className={entry.name === name ? "highlight" : ""}>
                <td>{index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Score;
