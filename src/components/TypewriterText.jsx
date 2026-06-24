import React, { useState, useEffect } from 'react';

export function TypewriterText({ text, speed = 35 }) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    
    const timer = setInterval(() => {
      setDisplayedText((prev) => {
        // Prevent adding undefined if index out of bounds
        if (i < text.length) {
          return prev + text.charAt(i);
        }
        return prev;
      });
      i++;
      if (i >= text.length) {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
}
