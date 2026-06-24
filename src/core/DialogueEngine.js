export class DialogueEngine {
  constructor(storyData) {
    this.story = storyData;
    this.nodes = storyData.nodes;
  }

  getNode(nodeId) {
    if (!this.nodes[nodeId]) {
      console.warn(`Node ${nodeId} not found in story data.`);
      return null;
    }
    return this.nodes[nodeId];
  }

  getChoices(nodeId, currentFlags) {
    const node = this.getNode(nodeId);
    if (!node || !node.choices) return [];

    return node.choices.filter(choice => {
      if (choice.requiredFlag) {
        for (const [key, value] of Object.entries(choice.requiredFlag)) {
          if (currentFlags[key] !== value) return false;
        }
      }
      return true;
    });
  }

  applyFlagChanges(choice, currentFlags) {
    if (!choice.setFlag && !choice.vibe_change) return currentFlags;
    
    let newFlags = { ...currentFlags };
    
    if (choice.setFlag) {
      newFlags = { ...newFlags, ...choice.setFlag };
    }
    
    if (choice.vibe_change) {
      newFlags.vibe = (newFlags.vibe || 0) + choice.vibe_change;
    }
    
    return newFlags;
  }
}
