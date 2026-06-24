import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './TimerBar.css';

export function TimerBar({ duration, onTimeout }) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Memaksa komponen untuk me-remount/restart animasi ketika durasi/node berubah
    setKey(prev => prev + 1);
  }, [duration]);

  return (
    <div className="timer-container" key={key}>
      <motion.div 
        className="timer-fill"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: duration, ease: "linear" }}
        onAnimationComplete={onTimeout}
        style={{ originX: 0 }} 
      />
    </div>
  );
}
