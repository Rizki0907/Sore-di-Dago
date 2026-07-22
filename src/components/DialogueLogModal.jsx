import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playButtonClick } from '../core/SoundManager';
import './DialogueLogModal.css';

export function DialogueLogModal({ isOpen, onClose, logEntries, language }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="log-modal-overlay" onClick={() => { playButtonClick(); onClose(); }}>
        <motion.div 
          className="log-modal-content glass-panel"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="log-header">
            <h2>📜 HISTORI DIALOG</h2>
            <button className="close-btn" onClick={() => { playButtonClick(); onClose(); }}>✕</button>
          </div>

          <div className="log-list">
            {logEntries.length === 0 ? (
              <p className="empty-log">Belum ada dialog sebelumnya.</p>
            ) : (
              logEntries.map((entry, idx) => (
                <div key={idx} className="log-item">
                  <span className="log-speaker">{entry.speaker}</span>
                  <span className="log-text">{entry.text[language] || entry.text.id}</span>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
