import React from 'react';

const Ball = ({ position, radius }) => {
  return (
    <div 
      className="ball absolute rounded-full bg-blue-500"
      style={{ 
        left: position.x - radius, 
        top: position.y - radius, 
        width: radius * 2, 
        height: radius * 2 
      }} 
    />
  );
};

export default Ball;