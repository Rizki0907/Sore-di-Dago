import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playButtonClick } from '../core/SoundManager';
import './AchievementModal.css';

export const ACHIEVEMENTS_DEF = [
  {
    id: 'CHAMPION',
    title: { su: 'BARUDAKS CHAMPION', id: 'BARUDAKS CHAMPION' },
    desc: { su: 'Buka Perfect Ending (Juara 1 Lomba JAWARA).', id: 'Buka Perfect Ending (Juara 1 Lomba JAWARA).' }
  },
  {
    id: 'BARISTA',
    title: { su: 'KOPI MASTER WARKOP', id: 'KOPI MASTER WARKOP' },
    desc: { su: 'Berhasil menyelesaikan QTE Racik Kopi Warkop.', id: 'Berhasil menyelesaikan QTE Racik Kopi Warkop.' }
  },
  {
    id: 'SEJARAWAN',
    title: { su: 'SEJARAWAN DAGO', id: 'SEJARAWAN DAGO' },
    desc: { su: 'Membuka modal Histori Dialog saat permainan.', id: 'Membuka modal Histori Dialog saat permainan.' }
  },
  {
    id: 'EMOSI',
    title: { su: 'EMOSI JIWA', id: 'EMOSI JIWA' },
    desc: { su: 'Memicu pertengkaran hebat antara Bima & Asep.', id: 'Memicu pertengkaran hebat antara Bima & Asep.' }
  },
  {
    id: 'SECRET',
    title: { su: 'RPG LEGEND', id: 'RPG LEGEND' },
    desc: { su: 'Membuka Secret Ending Open World RPG Bandung.', id: 'Membuka Secret Ending Open World RPG Bandung.' }
  }
];

export function AchievementModal({ isOpen, onClose, unlockedList = [], language = 'su' }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="achieve-overlay" onClick={() => { playButtonClick(); onClose(); }}>
        <motion.div 
          className="achieve-card glass-panel"
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="achieve-header">
            <h2>GALERI PENCAPAAN</h2>
            <button className="close-btn" onClick={() => { playButtonClick(); onClose(); }}>✕</button>
          </div>

          <div className="achieve-list">
            {ACHIEVEMENTS_DEF.map(item => {
              const isUnlocked = unlockedList.includes(item.id);
              return (
                <div key={item.id} className={`achieve-item ${isUnlocked ? 'unlocked' : 'locked'}`}>
                  <div className="achieve-info">
                    <span className="achieve-title">{item.title[language] || item.title.su}</span>
                    <span className="achieve-desc">{item.desc[language] || item.desc.su}</span>
                  </div>
                  <div className="achieve-status">
                    <span className={`status-pill ${isUnlocked ? 'unlocked' : 'locked'}`}>
                      {isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
