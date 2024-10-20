import React from 'react';
import Ball from './Ball';
import Enemy from './Enemy';
import Target from './Target';
import Obstacle from './Obstacle';

const GameBoard = ({ gameSize, ballPosition, ballRadius, targetPosition, targetSize, obstacles, enemies, enemySize }) => {
  return (
    <div style={{ width: gameSize.width, height: gameSize.height, position: 'relative' }}>
      <Target position={targetPosition} size={targetSize} />
      
      {enemies.map((enemy, index) => (
        <Enemy key={index} position={enemy} size={enemySize} />
      ))}
      
      <Ball position={ballPosition} radius={ballRadius} />
      
      {obstacles.map((obstacle, index) => (
        <Obstacle
          key={index}
          position={{ x: obstacle.x, y: obstacle.y }}
          width={obstacle.width}
          height={obstacle.height}
          isRounded={obstacle.isRounded} // Pass the isRounded property
        />
      ))}
    </div>
  );
};

export default GameBoard;
