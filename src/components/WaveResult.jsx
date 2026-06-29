import { sounds } from "../sounds.js";

// =============================================================================
// WaveResult — Shown between waves when the player defeats a monster.
// =============================================================================
function WaveResult({ monster, onNextWave }) {
  const handleNext = () => {
    sounds.buttonClick();
    onNextWave();
  };

  return (
    <div className="overlay wave-result-overlay">
      <div className="overlay-card">
        <div className="result-trophy">🏆</div>
        <h2 className="result-title">Wave Cleared!</h2>
        <p className="result-monster">
          {monster.emoji} <strong>{monster.name}</strong> has been defeated!
        </p>
        <div className="result-stars">{monster.reward}</div>
        <p className="result-tip">💚 You've recovered some HP before the next battle!</p>
        <button
          id="btn-next-wave"
          className="action-btn next-wave-btn"
          onClick={handleNext}
        >
          <span className="btn-icon">⚡</span>
          <span className="btn-label">NEXT WAVE</span>
        </button>
      </div>
    </div>
  );
}

export default WaveResult;
