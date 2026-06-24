import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypewriterText } from './TypewriterText';
import './DialogueBox.css';

// Import avatar karakter yang sudah di-generate
import avatarRaka from '../assets/avatar_Raka.png';
import avatarBima from '../assets/avatar_Bima.png';
import avatarAsep from '../assets/avatar_Asep.png';

const avatars = {
  Raka: avatarRaka,
  Bima: avatarBima,
  Asep: avatarAsep
};

export function DialogueBox({ speaker, text }) {
  const currentAvatar = avatars[speaker];

  return (
    <div className="dialogue-wrapper">
      <AnimatePresence mode="wait">
        {currentAvatar && (
          <motion.img 
            key={speaker}
            src={currentAvatar} 
            alt={speaker} 
            className="character-avatar"
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', stiffness: 100 }}
          />
        )}
      </AnimatePresence>

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
          <TypewriterText text={text} speed={35} />
        </div>
      </motion.div>
    </div>
  );
}
