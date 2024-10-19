import React from 'react';

const Obstacle = ({ position, width, height }) => {
  return (
    <div 
      className="obstacle absolute bg-gray-500"
      style={{ 
        left: position.x, 
        top: position.y, 
        width: width, 
        height: height,
        zIndex: 2,
      }} 
    />
  );
};

export default Obstacle;