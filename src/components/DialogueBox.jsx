import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypewriterText } from './TypewriterText';
import { ChromaKeyAvatar } from './ChromaKeyAvatar';
import './DialogueBox.css';

// Import avatar karakter yang sudah di-generate
import avatarRaka from '../assets/avatar_Raka_full.png';
import avatarBima from '../assets/avatar_Bima_full.png';
import avatarAsep from '../assets/avatar_Asep_full.png';

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
          <motion.div
            key={speaker}
            className="character-portrait-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            <ChromaKeyAvatar 
              src={currentAvatar} 
              alt={speaker} 
              className="character-avatar"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        key={text}
        className="dialogue-container glass-panel"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
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
