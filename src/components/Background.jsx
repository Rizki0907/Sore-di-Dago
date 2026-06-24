import React from 'react';
import { motion } from 'framer-motion';
import './Background.css';

export function Background({ transitionState }) {
  // Pemetaan state cerita ke warna gradien
  const backgrounds = {
    afternoon: 'linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)',
    sunset: 'linear-gradient(to bottom, #fa709a 0%, #fee140 100%)',
    evening: 'linear-gradient(to bottom, #0f172a 0%, #1e293b 100%)'
  };

  const currentBg = backgrounds[transitionState] || backgrounds.afternoon;

  return (
    <motion.div
      className="game-background"
      animate={{ background: currentBg }}
      transition={{ duration: 4, ease: "easeInOut" }}
    />
  );
}
