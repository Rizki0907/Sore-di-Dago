import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playButtonClick } from '../core/SoundManager';
import './MiniGameQTE.css';

const INGREDIENTS = [
  { id: 'kopi', label: '☕ KOPI', order: 1 },
  { id: 'susu', label: '🥛 SUSU', order: 2 },
  { id: 'es', label: '🧊 ES', order: 3 }
];

export function MiniGameQTE({ onComplete, language = 'su' }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(7); // 7 seconds duration
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0 && !isFinished) {
      setIsFinished(true);
      onComplete(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 0.1);
    }, 100);

    return () => clearInterval(timer);
  }, [timeLeft, isFinished, onComplete]);

  const handleIngredientClick = (item) => {
    playButtonClick();
    if (item.order === currentStep) {
      if (currentStep === 3) {
        setIsFinished(true);
        onComplete(true);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  return (
    <div className="qte-overlay">
      <motion.div 
        className="qte-card glass-panel"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className="qte-header">
          <span className="qte-title">
            ⚡ QUICK TIME EVENT: {language === 'su' ? 'RACIK KOPI WARKOP!' : 'RACIK KOPI WARKOP!'}
          </span>
          <span className="qte-timer">{Math.max(0, timeLeft).toFixed(1)}s</span>
        </div>

        <div className="qte-progress-bar">
          <div 
            className="qte-progress-fill" 
            style={{ width: `${Math.max(0, (timeLeft / 7) * 100)}%` }} 
          />
        </div>

        <p className="qte-instruction">
          {language === 'su' 
            ? `Tekan urutan bahan kopi (${currentStep}/3):` 
            : `Tekan urutan bahan kopi (${currentStep}/3):`}
        </p>

        <div className="qte-buttons">
          {INGREDIENTS.map(item => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`qte-btn ${item.order < currentStep ? 'done' : ''}`}
              onClick={() => handleIngredientClick(item)}
              disabled={item.order < currentStep}
            >
              {item.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
