import React, { useState, useEffect } from 'react';

const ClicksRemaining = ({ clicksLeft }) => {
  const [fontSize, setFontSize] = useState('48px');

  useEffect(() => {
    const updateFontSize = () => {
      const smallerDimension = Math.min(window.innerWidth, window.innerHeight);
      setFontSize(`${smallerDimension * 0.8}px`);
    };

    updateFontSize();
    window.addEventListener('resize', updateFontSize);

    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: fontSize,
    fontWeight: 'bold',
    color: 'rgba(211, 211, 211, 0.4)', // Light gray with 50% opacity
    fontFamily: 'Arial, sans-serif',
    zIndex: 0, // Place it above the background but below other game elements
    userSelect: 'none', // Prevent text selection
  };

  return (
    <div style={styles}>
      {clicksLeft}
    </div>
  );
};

export default ClicksRemaining;
