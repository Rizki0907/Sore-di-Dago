import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDialogue } from './core/useDialogue';
import { DialogueBox } from './components/DialogueBox';
import { ChoiceMenu } from './components/ChoiceMenu';
import { VibeMeter } from './components/VibeMeter';
import { TimerBar } from './components/TimerBar';
import { Background } from './components/Background';
import './styles/global.css';

function App() {
  const { currentNode, availableChoices, makeChoice, flags, handleTimeout } = useDialogue();
  const [bgState, setBgState] = useState('afternoon');
  const [language, setLanguage] = useState('su'); // 'su' = Sunda, 'id' = Indonesia

  // Pantau perubahan background
  useEffect(() => {
    if (currentNode && currentNode.bg_transition) {
      setBgState(currentNode.bg_transition);
    }
  }, [currentNode]);

  if (!currentNode) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '2rem', color: 'var(--color-text-primary)', background: 'var(--color-bg-primary)' }}>
        Cerita Selesai. Terima kasih barudaks!
      </div>
    );
  }

  const shakeVariants = {
    shake: { x: [-15, 15, -15, 15, -10, 10, 0], transition: { duration: 0.4 } },
    still: { x: 0 }
  };

  return (
    <motion.div
      animate={currentNode.shake ? "shake" : "still"}
      variants={shakeVariants}
      style={{ width: '100vw', height: '100vh', position: 'relative' }}
    >
      <Background transitionState={bgState} />
      
      {/* Tombol Toggle Bahasa */}
      <div className="language-toggle">
        <button 
          className={language === 'su' ? 'active' : ''} 
          onClick={() => setLanguage('su')}
        >
          SU
        </button>
        <button 
          className={language === 'id' ? 'active' : ''} 
          onClick={() => setLanguage('id')}
        >
          ID
        </button>
      </div>

      {currentNode.timer > 0 && availableChoices.length > 0 && (
        <TimerBar duration={currentNode.timer} onTimeout={handleTimeout} />
      )}

      <VibeMeter value={flags.vibe || 0} />
      
      <ChoiceMenu 
        choices={availableChoices} 
        onSelect={makeChoice} 
        language={language}
      />
      
      <DialogueBox 
        speaker={currentNode.speaker} 
        text={currentNode.text[language]} 
      />
    </motion.div>
  );
}

export default App;
