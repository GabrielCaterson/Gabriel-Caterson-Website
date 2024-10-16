import React from 'react';
import Ball from './Ball';
import Enemy from './Enemy';
import Obstacle from './Obstacle';
import Target from './Target';

const GameBoard = ({ 
  gameSize, 
  ballPosition, 
  ballRadius, 
  targetPosition, 
  targetSize, 
  obstacles, 
  enemies, 
  handleClick 
}) => {
  return (
    <div 
      className="game-board w-full h-full overflow-hidden relative bg-gray-100 cursor-pointer" 
      onClick={handleClick}
      style={{ width: gameSize.width, height: gameSize.height }}
    >
      <Ball position={ballPosition} radius={ballRadius} />
      <Target position={targetPosition} size={targetSize} />
      {obstacles.map((obstacle, index) => (
        <Obstacle
          key={index}
          position={{ x: obstacle.x, y: obstacle.y }}
          width={obstacle.width}
          height={obstacle.height}
        />
      ))}
      {enemies.map((enemy, index) => (
        <Enemy
          key={index}
          position={enemy}
          size={15} // Assuming enemy size is 15
        />
      ))}
    </div>
  );
};

export default GameBoard;
