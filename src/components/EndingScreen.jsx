import React from 'react';
import { motion } from 'framer-motion';
import { playButtonClick } from '../core/SoundManager';
import './EndingScreen.css';

const ENDING_DETAILS = {
  ending_good: {
    title: { su: "ENDING 1/4: BARUDAKS CHAMPION SQUAD", id: "ENDING 1/4: BARUDAKS CHAMPION SQUAD" },
    badge: "🏆 PERFECT ENDING",
    badgeColor: "#10b981",
    desc: { 
      su: "Kalian bersatu padu merancang game JAWARA dengan semangat tinggi. Pertemanan kalian makin solid dan siap menyapu bersih gelar juara 1!", 
      id: "Kalian bersatu padu merancang game JAWARA dengan semangat tinggi. Pertemanan kalian makin solid dan siap menyapu bersih gelar juara 1!" 
    }
  },
  ending_neutral: {
    title: { su: "ENDING 2/4: INDOMIE & KOPI SANTAI", id: "ENDING 2/4: INDOMIE & KOPI SANTAI" },
    badge: "☕ CHILL ENDING",
    badgeColor: "#3b82f6",
    desc: { 
      su: "Game tetap selesai walau santai, yang penting perut kenyang dan persahabatan di warkop Dago tetap hangat.", 
      id: "Game tetap selesai walau santai, yang penting perut kenyang dan persahabatan di warkop Dago tetap hangat." 
    }
  },
  ending_bad: {
    title: { su: "ENDING 3/4: BUBAR TONGKRONGAN", id: "ENDING 3/4: BUBAR TONGKRONGAN" },
    badge: "💔 BAD ENDING",
    badgeColor: "#ef4444",
    desc: { 
      su: "Perdebatan sengit membuat Bima dan Asep pulang dengan emosi. Lomba JAWARA batal, dan warkop terasa sepi.", 
      id: "Perdebatan sengit membuat Bima dan Asep pulang dengan emosi. Lomba JAWARA batal, dan warkop terasa sepi." 
    }
  },
  ending_secret: {
    title: { su: "ENDING 4/4: MAKER WARKOP RPG", id: "ENDING 4/4: MAKER WARKOP RPG" },
    badge: "⭐ SECRET ENDING",
    badgeColor: "#8b5cf6",
    desc: { 
      su: "Kalian nekat membuat Open World RPG Alun-Alun Bandung! Semua barudaks kaget melihat hasil karya kalian yang di luar nalar.", 
      id: "Kalian nekat membuat Open World RPG Alun-Alun Bandung! Semua barudaks kaget melihat hasil karya kalian yang di luar nalar." 
    }
  }
};

export function EndingScreen({ endingType, vibeScore, onRestart, language }) {
  const info = ENDING_DETAILS[endingType] || ENDING_DETAILS.ending_neutral;

  return (
    <div className="ending-overlay">
      <motion.div 
        className="ending-card glass-panel"
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="ending-badge" style={{ backgroundColor: info.badgeColor }}>
          {info.badge}
        </div>

        <h1 className="ending-title">{info.title[language] || info.title.id}</h1>
        
        <p className="ending-desc">
          {info.desc[language] || info.desc.id}
        </p>

        <div className="ending-stats">
          <div className="stat-box">
            <span className="stat-label">Final Vibe Score</span>
            <span className="stat-value">{vibeScore > 0 ? `+${vibeScore}` : vibeScore}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Status Barudaks</span>
            <span className="stat-value">{vibeScore >= 2 ? 'Solid Banget ☕' : vibeScore >= 0 ? 'Aman Santai 👌' : 'Retak Euy ⚡'}</span>
          </div>
        </div>

        <button 
          className="restart-btn"
          onClick={() => {
            playButtonClick();
            onRestart();
          }}
        >
          🔄 {language === 'su' ? 'Main Deui (Restart)' : 'Main Lagi (Restart)'}
        </button>
      </motion.div>
    </div>
  );
}
