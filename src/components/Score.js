// src/components/Score.js
import React, { useEffect, useState } from 'react';
import '../App.css';

const Score = ({ score, name }) => {
  const [leaderboard, setLeaderboard] = useState([]);

 useEffect(() => {
  const data = JSON.parse(localStorage.getItem("quiz-leaderboard")) || [];

  const trimmedName = name.trim().toLowerCase();

  // Filter out any existing entries with same name (case-insensitive)
  const filtered = data.filter(
    (entry) => entry.name.trim().toLowerCase() !== trimmedName
  );

  // Add the latest score
  const updatedData = [...filtered, { name: name.trim(), score }];

  // Keep only highest score per user
  const uniqueMap = {};
  updatedData.forEach((entry) => {
    const key = entry.name.trim().toLowerCase();
    if (!uniqueMap[key] || entry.score > uniqueMap[key].score) {
      uniqueMap[key] = entry;
    }
  });

  const uniqueList = Object.values(uniqueMap);
  const sorted = uniqueList.sort((a, b) => b.score - a.score);

  localStorage.setItem("quiz-leaderboard", JSON.stringify(sorted));
  setLeaderboard(sorted);
}, [name, score]);


  return (
    <div className="score-container text-center mt-4">
      <h2 className="congrats">Well done, {name}!</h2>
      <h4 className="your-score">
        Your Score is : <span>{score}</span>
      </h4>

      <h3 className="leaderboard-title mt-4">Leaderboard 🏆</h3>
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
              <tr key={index} className={entry.name === name && entry.score === score ? "highlight" : ""}>
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
