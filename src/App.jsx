import React, { useState, useEffect } from 'react';
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

  return (
    <>
      <Background transitionState={bgState} />
      
      {currentNode.timer > 0 && availableChoices.length > 0 && (
        <TimerBar duration={currentNode.timer} onTimeout={handleTimeout} />
      )}

      <VibeMeter value={flags.vibe || 0} />
      
      <ChoiceMenu 
        choices={availableChoices} 
        onSelect={makeChoice} 
      />
      
      <DialogueBox 
        speaker={currentNode.speaker} 
        text={currentNode.text} 
      />
    </>
  );
}

export default App;
