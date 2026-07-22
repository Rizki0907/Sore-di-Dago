import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bgImage from '../assets/bg_warkop_wide.png';
import './Background.css';

const TIME_LABELS = {
  afternoon: { su: '🌆 SOER (SORE)', id: '🌆 SORE (AFTERNOON)' },
  sunset: { su: '🌇 SENJA (SUNSET)', id: '🌇 SENJA (SUNSET)' },
  evening: { su: '🌃 PEUTING (MALAM)', id: '🌃 MALAM (NIGHT)' },
  night: { su: '🌃 PEUTING (MALAM)', id: '🌃 MALAM (NIGHT)' }
};

export function Background({ transitionState, language = 'su' }) {
  const overlays = {
    afternoon: 'linear-gradient(to bottom, rgba(79, 172, 254, 0.05) 0%, rgba(255, 235, 200, 0.1) 100%)',
    sunset: 'linear-gradient(to bottom, rgba(250, 112, 154, 0.55) 0%, rgba(254, 225, 64, 0.35) 100%)',
    evening: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.9) 100%)',
    night: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.9) 100%)'
  };

  const currentOverlay = overlays[transitionState] || overlays.afternoon;
  const timeLabel = TIME_LABELS[transitionState] || TIME_LABELS.afternoon;

  return (
    <div className="game-background" style={{ backgroundImage: `url(${bgImage})` }}>
      <motion.div
        className="game-bg-overlay"
        animate={{ background: currentOverlay }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />

      <AnimatePresence mode="wait">
        <motion.div 
          key={transitionState}
          className="time-badge glass-panel"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {timeLabel[language] || timeLabel.su}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
