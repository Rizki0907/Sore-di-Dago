import React from 'react';
import { motion } from 'framer-motion';
import './ChoiceMenu.css';

export function ChoiceMenu({ choices, onSelect }) {
  if (!choices || choices.length === 0) return null;

  return (
    <div className="choices-container">
      {choices.map((choice, index) => (
        <motion.button
          key={index}
          className="choice-btn glass-panel"
          onClick={() => onSelect(choice)}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderColor: 'var(--color-accent-hover)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          {choice.text}
        </motion.button>
      ))}
    </div>
  );
}
