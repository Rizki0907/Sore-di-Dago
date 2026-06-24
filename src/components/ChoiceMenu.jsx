import React from 'react';
import { motion } from 'framer-motion';
import { playButtonClick } from '../core/SoundManager';
import './ChoiceMenu.css';

export function ChoiceMenu({ choices, onSelect, language = 'su' }) {
  if (!choices || choices.length === 0) return null;

  return (
    <div className="choices-container">
      {choices.map((choice, index) => (
        <motion.button
          key={index}
          className="choice-btn glass-panel"
          onClick={() => {
            playButtonClick();
            onSelect(choice);
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0px 0px 8px rgba(255,255,255,0.5)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          {choice.text[language]}
        </motion.button>
      ))}
    </div>
  );
}
