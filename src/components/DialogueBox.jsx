import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypewriterText } from './TypewriterText';
import { ChromaKeyAvatar } from './ChromaKeyAvatar';
import './DialogueBox.css';

import avatarRakaNormal from '../assets/avatar_Raka_full.png';
import avatarRakaThinking from '../assets/avatar_Raka_thinking.png';
import avatarRakaHappy from '../assets/avatar_Raka_happy.png';

import avatarBimaNormal from '../assets/avatar_Bima_full.png';
import avatarBimaExcited from '../assets/avatar_Bima_excited.png';
import avatarBimaAngry from '../assets/avatar_Bima_angry.png';

import avatarAsepNormal from '../assets/avatar_Asep_full.png';
import avatarAsepShouting from '../assets/avatar_Asep_shouting.png';

const avatars = {
  Raka: {
    normal: avatarRakaNormal,
    thinking: avatarRakaThinking,
    happy: avatarRakaHappy,
  },
  Bima: {
    normal: avatarBimaNormal,
    excited: avatarBimaExcited,
    angry: avatarBimaAngry,
  },
  Asep: {
    normal: avatarAsepNormal,
    shouting: avatarAsepShouting,
    hungry: avatarAsepShouting,
  }
};

export function DialogueBox({ speaker, text, emotion = 'normal' }) {
  const speakerAvatars = avatars[speaker];
  const currentAvatar = (speakerAvatars && speakerAvatars[emotion]) || (speakerAvatars && speakerAvatars.normal);

  return (
    <div className="dialogue-wrapper">
      <AnimatePresence mode="wait">
        {currentAvatar && (
          <motion.div
            key={`${speaker}_${emotion}`}
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
