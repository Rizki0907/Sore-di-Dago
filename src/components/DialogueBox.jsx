import React from 'react';
import { motion } from 'framer-motion';
import { TypewriterText } from './TypewriterText';
import './DialogueBox.css';

export function DialogueBox({ speaker, text }) {
  // Key digunakan agar animasi me-restart ketika text berubah
  return (
    <div className="dialogue-wrapper">
      <motion.div 
        key={text}
        className="dialogue-container glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {speaker && (
          <div className="speaker-name">
            {speaker}
          </div>
        )}
        <div className="dialogue-text">
          <TypewriterText text={text} />
        </div>
      </motion.div>
    </div>
  );
}
