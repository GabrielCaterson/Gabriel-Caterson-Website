import React from 'react';

const Target = ({ position, size }) => {
  return (
    <div 
      className="target absolute bg-green-500 rounded-full w-full h-full animate-spin"
      style={{ 
        left: position.x - size / 2, 
        top: position.y - size / 2, 
        width: size, 
        height: size,
        border: '3px dotted #000',
        zIndex: 1,
        animation: "spin 20s infinite linear"
      }}
    >
      {/* Animated ping circle */}
      <div 
        className="absolute bg-green-500 rounded-full w-full h-full animate-ping animate-reverse"
        style={{
            animation: 'ping 4s infinite reverse alternate',
            animationDelay: '2s'
        }}
      />
    </div>
  );
};

export default Target;