import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDialogue } from './core/useDialogue';
import { DialogueBox } from './components/DialogueBox';
import { ChoiceMenu } from './components/ChoiceMenu';
import { VibeMeter } from './components/VibeMeter';
import { TimerBar } from './components/TimerBar';
import { Background } from './components/Background';
import { WarkopParticles } from './components/WarkopParticles';
import { DialogueLogModal } from './components/DialogueLogModal';
import { EndingScreen } from './components/EndingScreen';
import { startBGM, toggleMute, playShakeSound, playButtonClick } from './core/SoundManager';
import './styles/global.css';

function App() {
  const { currentNode, availableChoices, makeChoice, flags, handleTimeout, dialogueLog, restartDialogue } = useDialogue();
  const [bgState, setBgState] = useState('afternoon');
  const [language, setLanguage] = useState('su');
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    startBGM();
  }, []);

  useEffect(() => {
    if (currentNode) {
      if (currentNode.bg_transition) {
        setBgState(currentNode.bg_transition);
      }
      if (currentNode.shake) {
        playShakeSound();
      }
    }
  }, [currentNode]);

  const handleToggleMute = () => {
    playButtonClick();
    const muted = toggleMute();
    setIsMuted(muted);
  };

  const shakeVariants = {
    shake: { x: [-15, 15, -15, 15, -10, 10, 0], transition: { duration: 0.4 } },
    still: { x: 0 }
  };

  if (currentNode && currentNode.isEnding) {
    return (
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <Background transitionState={bgState} />
        <WarkopParticles />
        <EndingScreen 
          endingType={currentNode.endingType}
          vibeScore={flags.vibe || 0}
          onRestart={restartDialogue}
          language={language}
        />
      </div>
    );
  }

  if (!currentNode) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '2rem', color: 'var(--color-text-primary)', background: 'var(--color-bg-primary)' }}>
        Cerita Selesai. Terima kasih barudaks!
      </div>
    );
  }

  return (
    <motion.div
      animate={currentNode.shake ? "shake" : "still"}
      variants={shakeVariants}
      style={{ width: '100vw', height: '100vh', position: 'relative' }}
      onClick={() => startBGM()}
    >
      <Background transitionState={bgState} />
      <WarkopParticles />
      
      {/* Top Control Bar */}
      <div className="top-control-bar">
        <button 
          className="top-btn" 
          onClick={handleToggleMute}
          title="Audio Soundscape"
        >
          {isMuted ? '🔇 Audio Off' : '🔊 Audio On'}
        </button>

        <button 
          className="top-btn" 
          onClick={() => { playButtonClick(); setIsLogOpen(true); }}
          title="Dialogue History"
        >
          📜 Log
        </button>

        <button 
          className={`top-btn ${language === 'su' ? 'active' : ''}`} 
          onClick={() => { playButtonClick(); setLanguage('su'); }}
        >
          SU
        </button>
        <button 
          className={`top-btn ${language === 'id' ? 'active' : ''}`} 
          onClick={() => { playButtonClick(); setLanguage('id'); }}
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
        text={currentNode.text ? currentNode.text[language] : ''} 
        emotion={currentNode.emotion || 'normal'}
      />

      <DialogueLogModal 
        isOpen={isLogOpen}
        onClose={() => setIsLogOpen(false)}
        logEntries={dialogueLog}
        language={language}
      />
    </motion.div>
  );
}

export default App;
