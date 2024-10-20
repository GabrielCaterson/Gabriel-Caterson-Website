import React from 'react';

const Obstacle = ({ position, width, height, isRounded }) => {
  return (
    <div 
      className={`obstacle absolute bg-gray-500 ${isRounded ? 'rounded-lg' : ''}`}
      style={{ 
        left: position.x, 
        top: position.y, 
        width: width, 
        height: height,
        zIndex: 10, // Increased z-index
      }} 
    />
  );
};

export default Obstacle;
