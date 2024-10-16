import React from 'react';

const Target = ({ position, size }) => {
  return (
    <div 
      className="target absolute bg-green-500"
      style={{ 
        left: position.x - size / 2, 
        top: position.y - size / 2, 
        width: size, 
        height: size 
      }} 
    />
  );
};

export default Target;

