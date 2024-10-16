import React from 'react';

const Enemy = ({ position, size }) => {
  return (
    <div 
      className="enemy absolute rounded-full bg-red-500"
      style={{ 
        left: position.x - size / 2, 
        top: position.y - size / 2, 
        width: size, 
        height: size 
      }} 
    />
  );
};

export default Enemy;