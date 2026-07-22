import { useState, useCallback, useMemo, useEffect } from 'react';
import { DialogueEngine } from './DialogueEngine';
import storyData from '../data/story.json';

export function useDialogue() {
  const engine = useMemo(() => new DialogueEngine(storyData), []);
  
  const [currentNodeId, setCurrentNodeId] = useState(storyData.startNode);
  const [flags, setFlags] = useState({ vibe: 0 });
  const [history, setHistory] = useState([]);
  const [dialogueLog, setDialogueLog] = useState([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem('sore_dago_achievements');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const currentNode = engine.getNode(currentNodeId);
  const availableChoices = engine.getChoices(currentNodeId, flags);

  const unlockAchievement = useCallback((id) => {
    setUnlockedAchievements(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem('sore_dago_achievements', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  }, []);

  useEffect(() => {
    if (currentNode && currentNode.text && currentNode.speaker) {
      setDialogueLog(prev => {
        const last = prev[prev.length - 1];
        if (last && last.nodeId === currentNodeId) return prev;
        return [...prev, { nodeId: currentNodeId, speaker: currentNode.speaker, text: currentNode.text }];
      });
    }

    if (currentNode && currentNode.endingType) {
      if (currentNode.endingType === 'ending_good') unlockAchievement('CHAMPION');
      if (currentNode.endingType === 'ending_secret') unlockAchievement('SECRET');
    }

    if (currentNodeId === 'konflik_parah') {
      unlockAchievement('EMOSI');
    }
  }, [currentNodeId, currentNode, unlockAchievement]);

  const makeChoice = useCallback((choice) => {
    setHistory(prev => [...prev, currentNodeId]);
    
    const newFlags = engine.applyFlagChanges(choice, flags);
    setFlags(newFlags);
    
    if (choice.next) {
      setCurrentNodeId(choice.next);
    } else {
      console.warn("End of story or missing next node.");
    }
  }, [currentNodeId, flags, engine]);

  const handleTimeout = useCallback(() => {
    if (currentNode && currentNode.timeout_next) {
       setHistory(prev => [...prev, currentNodeId]);
       setCurrentNodeId(currentNode.timeout_next);
    }
  }, [currentNode, currentNodeId]);

  const restartDialogue = useCallback(() => {
    setCurrentNodeId(storyData.startNode);
    setFlags({ vibe: 0 });
    setHistory([]);
    setDialogueLog([]);
  }, []);

  return {
    currentNode,
    availableChoices,
    flags,
    history,
    dialogueLog,
    unlockedAchievements,
    unlockAchievement,
    makeChoice,
    handleTimeout,
    restartDialogue
  };
}
