import React from 'react';

const ScoreBoard = ({ streak, highScore, clickCount, calculateEnemyCount }) => {
  return (
    <div className="score absolute top-2 left-2 text-2xl font-bold text-slate-700 pointer-events-none user-select-none">
      <p>Streak: {streak}</p>
      <p>Best Streak: {highScore}</p>
      <p>Clicks: {clickCount}</p>
      <p>Level: {streak + 1}</p>
      <p>Enemies: {calculateEnemyCount()}</p>
    </div>
  );
};

export default ScoreBoard;

