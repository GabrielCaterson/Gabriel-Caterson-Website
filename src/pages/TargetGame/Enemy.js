import React from 'react';

const Enemy = ({ position, size }) => {
  const outerSize = size * 1.2; // Make the outer circle 20% larger

  return (
    <div className="enemy-container" style={{ 
      position: 'absolute',
      left: position.x - outerSize / 2,
      top: position.y - outerSize / 2,
      width: outerSize,
      height: outerSize,
      zIndex: 2,
    }}>
      {/* Outer circle with dotted border */}
      <div 
        className="absolute rounded-full animate-spin"
        style={{ 
          width: '100%',
          height: '100%',
          border: '2px dotted red',
          animation: 'spin 7s infinite linear'
        }} 
      />
      {/* Inner enemy circle */}
      <div 
        className="absolute rounded-full bg-red-500 animate-spin"
        style={{ 
          left: '5%', // Center the inner circle within the outer circle
          top: '5%',
          width: '90%', // Make the inner circle fit within the outer circle
          height: '90%',
          animation: 'spin 7s infinite linear'
        }} 
      />
    </div>
  );
};

export default Enemy;
