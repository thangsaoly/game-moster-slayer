// =============================================================================
// SOUND ENGINE — Procedurally generated sounds via the Web Audio API.
// No audio files needed; all sounds are synthesized in real-time.
// =============================================================================

let audioCtx = null;

/** Lazily create the AudioContext on first user interaction (browser policy). */
function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

/**
 * Creates a short, sharp oscillator burst.
 * @param {number} frequency - Base pitch in Hz
 * @param {string} type - Oscillator type: 'sine' | 'square' | 'sawtooth' | 'triangle'
 * @param {number} duration - Sound length in seconds
 * @param {number} gainPeak - Volume peak (0.0 – 1.0)
 */
function playTone(frequency, type, duration, gainPeak = 0.3) {
  const ctx = getCtx();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
  // Pitch sweep downward for impact feel
  oscillator.frequency.exponentialRampToValueAtTime(
    frequency * 0.5,
    ctx.currentTime + duration
  );

  gainNode.gain.setValueAtTime(gainPeak, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

export const sounds = {
  attack: () => playTone(220, "sawtooth", 0.12, 0.4),

  specialAttack: () => {
    // Two-tone punch for dramatic effect
    playTone(400, "square", 0.08, 0.5);
    setTimeout(() => playTone(200, "sawtooth", 0.2, 0.6), 80);
  },

  heal: () => {
    // Rising arpeggio — feels magical
    playTone(523, "sine", 0.1, 0.2);
    setTimeout(() => playTone(659, "sine", 0.1, 0.2), 80);
    setTimeout(() => playTone(784, "sine", 0.15, 0.3), 160);
  },

  monsterAttack: () => playTone(110, "sawtooth", 0.18, 0.35),

  victory: () => {
    // Triumphant fanfare
    [523, 659, 784, 1047].forEach((freq, i) => {
      setTimeout(() => playTone(freq, "sine", 0.2, 0.4), i * 120);
    });
  },

  defeat: () => {
    // Descending doom chord
    [220, 185, 155, 130].forEach((freq, i) => {
      setTimeout(() => playTone(freq, "sawtooth", 0.25, 0.3), i * 150);
    });
  },

  buttonClick: () => playTone(600, "sine", 0.05, 0.15),

  waveComplete: () => {
    [659, 784, 988].forEach((freq, i) => {
      setTimeout(() => playTone(freq, "triangle", 0.15, 0.35), i * 100);
    });
  },
};
