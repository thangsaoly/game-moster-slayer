import { sounds } from "../sounds.js";
import { MONSTERS } from "../gameData.js";

// =============================================================================
// GameOver — Final screen for both victory and defeat.
// =============================================================================
function GameOver({ isVictory, totalStars, hero, onRestart, onReturnToSelect }) {
  const maxStars = MONSTERS.reduce((sum, m) => sum + m.reward.length, 0);

  // Star rating: 0–1 = 1 star, 2–4 = 2 stars, 5–6 = 3 stars (full clear)
  const starRating =
    totalStars >= maxStars ? 3 : totalStars >= Math.floor(maxStars / 2) ? 2 : totalStars > 0 ? 1 : 0;

  const handleRestart = () => {
    sounds.buttonClick();
    onRestart();
  };

  const handleReturnToSelect = () => {
    sounds.buttonClick();
    onReturnToSelect();
  };

  return (
    <div className={`overlay game-over-overlay ${isVictory ? "victory-overlay" : "defeat-overlay"}`}>
      <div className="overlay-card">
        {isVictory ? (
          <>
            <div className="result-trophy">👑</div>
            <h2 className="result-title victory-title">VICTORY!</h2>
            <p className="result-subtitle">
              {hero.emoji} {hero.name} has conquered all monsters!
            </p>
            <div className="star-rating">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className={`star ${i < starRating ? "star-filled" : "star-empty"}`}
                >
                  ⭐
                </span>
              ))}
            </div>
            <p className="result-score">
              {totalStars} / {maxStars} stars collected
            </p>
          </>
        ) : (
          <>
            <div className="result-trophy">💀</div>
            <h2 className="result-title defeat-title">DEFEATED</h2>
            <p className="result-subtitle">
              {hero.emoji} {hero.name} has fallen in battle...
            </p>
            {totalStars > 0 && (
              <div className="star-rating">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    className={`star ${i < starRating ? "star-filled" : "star-empty"}`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            )}
            <p className="result-score">{totalStars} stars earned before defeat</p>
          </>
        )}

        <div className="game-over-actions">
          <button
            id="btn-restart"
            className="action-btn attack-btn"
            onClick={handleRestart}
          >
            <span className="btn-icon">🔄</span>
            <span className="btn-label">PLAY AGAIN</span>
          </button>
          <button
            id="btn-change-hero"
            className="action-btn heal-btn"
            onClick={handleReturnToSelect}
          >
            <span className="btn-icon">🗡️</span>
            <span className="btn-label">CHANGE HERO</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOver;
