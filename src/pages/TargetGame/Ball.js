import React, { useState, useEffect } from 'react';

const Ball = ({ position, radius }) => {
  const [tailPositions, setTailPositions] = useState([]);
  const tailLength = 5; // Increased from 3 to 5 for a longer tail

  useEffect(() => {
    setTailPositions(prevPositions => {
      const newPositions = [position, ...prevPositions.slice(0, tailLength - 1)];
      return newPositions;
    });
  }, [position]);

  return (
    <>
      <div 
        className="ball absolute rounded-full bg-blue-500"
        style={{ 
          left: position.x - radius, 
          top: position.y - radius, 
          width: radius * 2, 
          height: radius * 2,
          zIndex: 30
        }} 
      />
      {tailPositions.slice(1).map((pos, index) => (
        <div
          key={index}
          className="ball-tail absolute rounded-full bg-blue-300"
          style={{
            left: pos.x - radius * (0.8 - index * 0.15),
            top: pos.y - radius * (0.8 - index * 0.15),
            width: radius * 2 * (0.8 - index * 0.15),
            height: radius * 2 * (0.8 - index * 0.15),
            opacity: 0.8 - index * 0.15,
            zIndex: 29 - index
          }}
        />
      ))}
    </>
  );
};

export default Ball;
