import { useState, useCallback, useMemo } from 'react';
import { DialogueEngine } from './DialogueEngine';
import storyData from '../data/story.json';

export function useDialogue() {
  const engine = useMemo(() => new DialogueEngine(storyData), []);
  
  const [currentNodeId, setCurrentNodeId] = useState(storyData.startNode);
  const [flags, setFlags] = useState({ vibe: 0 });
  const [history, setHistory] = useState([]);

  const currentNode = engine.getNode(currentNodeId);
  const availableChoices = engine.getChoices(currentNodeId, flags);

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

  return {
    currentNode,
    availableChoices,
    flags,
    history,
    makeChoice,
    handleTimeout
  };
}
