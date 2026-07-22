import React from 'react';
import { motion } from 'framer-motion';
import bgImage from '../assets/bg_warkop_wide.png';
import './Background.css';

export function Background({ transitionState }) {
  const overlays = {
    afternoon: 'linear-gradient(to bottom, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0) 100%)',
    sunset: 'linear-gradient(to bottom, rgba(250, 112, 154, 0.6) 0%, rgba(254, 225, 64, 0.3) 100%)',
    evening: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.9) 100%)'
  };

  const currentOverlay = overlays[transitionState] || overlays.afternoon;

  return (
    <div className="game-background" style={{ backgroundImage: `url(${bgImage})` }}>
      <motion.div
        className="game-bg-overlay"
        animate={{ background: currentOverlay }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />
    </div>
  );
}
