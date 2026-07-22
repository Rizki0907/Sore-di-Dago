// Menggunakan Web Audio API untuk mensintesis suara & BGM Lo-Fi secara real-time
// 100% Procedural Audio tanpa file mp3 eksternal!

let audioCtx = null;
let isMuted = false;
let bgmGainNode = null;
let bgmInterval = null;

const initAudio = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const getIsMuted = () => isMuted;

export const toggleMute = () => {
  isMuted = !isMuted;
  if (bgmGainNode && audioCtx) {
    bgmGainNode.gain.setValueAtTime(isMuted ? 0 : 0.03, audioCtx.currentTime);
  }
  return isMuted;
};

export const playTypewriterBlip = () => {
  if (isMuted) return;
  initAudio();
  if (!audioCtx) return;
  
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(450 + Math.random() * 150, audioCtx.currentTime);
  
  gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.04);
};

export const playButtonClick = () => {
  if (isMuted) return;
  initAudio();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(320, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.08);
  
  gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.08);
};

export const playShakeSound = () => {
  if (isMuted) return;
  initAudio();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(150, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.3);
  
  gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
};

// Chord Lo-Fi Procedural untuk BGM Warkop
const CHORDS = [
  [261.63, 329.63, 392.00, 493.88], // Cmaj7
  [220.00, 261.63, 329.63, 392.00], // Am7
  [293.66, 349.23, 440.00, 523.25], // Dm7
  [196.00, 246.94, 293.66, 349.23]  // G7
];

export const startBGM = () => {
  initAudio();
  if (!audioCtx || bgmInterval) return;

  bgmGainNode = audioCtx.createGain();
  bgmGainNode.gain.setValueAtTime(isMuted ? 0 : 0.03, audioCtx.currentTime);

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(600, audioCtx.currentTime);

  filter.connect(bgmGainNode);
  bgmGainNode.connect(audioCtx.destination);

  let chordIndex = 0;

  const playChord = () => {
    if (isMuted || !audioCtx) return;
    const freqs = CHORDS[chordIndex % CHORDS.length];
    chordIndex++;

    freqs.forEach(freq => {
      const osc = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      noteGain.gain.setValueAtTime(0, audioCtx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 0.8);
      noteGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3.5);

      osc.connect(noteGain);
      noteGain.connect(filter);

      osc.start();
      osc.stop(audioCtx.currentTime + 3.6);
    });
  };

  playChord();
  bgmInterval = setInterval(playChord, 3800);
};

export const stopBGM = () => {
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
};
