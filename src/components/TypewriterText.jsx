import React, { useState, useEffect } from 'react';
import { playTypewriterBlip } from '../core/SoundManager';

export function TypewriterText({ text, speed = 40 }) {
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
      let currentIndex = i;
      i++;
      if (currentIndex < text.length) {
        // Mainkan suara secara acak untuk mensimulasikan ketikan natural
        if (currentIndex % 2 === 0 && text[currentIndex] !== ' ') {
          playTypewriterBlip();
        }

        let delay = speed;
        // Tambahkan jeda untuk tanda baca
        if (['.', '!', '?'].includes(text[currentIndex])) {
          delay = speed * 8;
        }
      }
      if (i >= text.length) {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
}
