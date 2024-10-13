import React, { useState, useEffect } from 'react';

const TypingText = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length - 1) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval); // Clear the interval once all letters are displayed
      }
    }, speed);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [text, speed]);

  return <div>{displayedText}</div>;
};

export default TypingText;