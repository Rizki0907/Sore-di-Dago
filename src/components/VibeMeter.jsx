import React from 'react';
import { motion } from 'framer-motion';
import './VibeMeter.css';

export function VibeMeter({ value }) {
  // Asumsi nilai vibe dari -5 (buruk) sampai 5 (bagus), diubah ke 0% - 100%
  const percentage = Math.min(Math.max((value + 5) * 10, 0), 100);
  
  let color = 'var(--color-vibe-neutral)';
  if (value >= 2) color = 'var(--color-vibe-high)';
  if (value <= -2) color = 'var(--color-vibe-low)';

  return (
    <div className="vibe-container glass-panel">
      <div className="vibe-label">VIBE</div>
      <div className="vibe-bar-bg">
        <motion.div 
          className="vibe-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%`, backgroundColor: color }}
          transition={{ type: "spring", stiffness: 50 }}
        />
      </div>
    </div>
  );
}
