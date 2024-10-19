import React from 'react';

const GameBoard = ({ gameSize, ballPosition, ballRadius, targetPosition, targetSize, obstacles, enemies, enemySize }) => {
  return (
    <svg width={gameSize.width} height={gameSize.height}>
      {/* Render obstacles */}
      {obstacles.map((obstacle, index) => {
        switch (obstacle.type) {
          case 'rectangle':
            return (
              <rect
                key={index}
                x={obstacle.x}
                y={obstacle.y}
                width={obstacle.width}
                height={obstacle.height}
                fill="gray"
              />
            );
          case 'circle':
            return (
              <circle
                key={index}
                cx={obstacle.x}
                cy={obstacle.y}
                r={obstacle.radius}
                fill="gray"
              />
            );
          case 'polygon':
            return (
              <polygon
                key={index}
                points={obstacle.points.map(p => `${p.x},${p.y}`).join(' ')}
                fill="gray"
              />
            );
          default:
            return null;
        }
      })}

      {/* Render target */}
      <circle
        cx={targetPosition.x}
        cy={targetPosition.y}
        r={targetSize / 2}
        fill="green"
      />

      {/* Render ball */}
      <circle
        cx={ballPosition.x}
        cy={ballPosition.y}
        r={ballRadius}
        fill="blue"
      />

      {/* Render enemies */}
      {enemies.map((enemy, index) => (
        <circle
          key={index}
          cx={enemy.x}
          cy={enemy.y}
          r={enemySize / 2}
          fill="red"
        />
      ))}
    </svg>
  );
};

export default GameBoard;
