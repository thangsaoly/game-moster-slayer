import { HEROES } from "../gameData.js";
import { sounds } from "../sounds.js";

// =============================================================================
// HeroSelect — The opening screen where the player picks their champion.
// Inspired by the CoC "Choose your Hero" UI.
// =============================================================================
function HeroSelect({ onSelect }) {
  const handleSelect = (hero) => {
    sounds.buttonClick();
    onSelect(hero);
  };

  return (
    <div className="hero-select-screen">
      {/* Animated particle background dots */}
      <div className="bg-particles" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="particle" style={{ "--i": i }} />
        ))}
      </div>

      <header className="select-header">
        <div className="header-icon">⚔️</div>
        <h1 className="game-title">MONSTER SLAYER</h1>
        <p className="game-subtitle">V2 — CLASH EDITION</p>
      </header>

      <section className="hero-cards-wrapper">
        <h2 className="choose-title">Choose Your Champion</h2>
        <div className="hero-cards-grid">
          {HEROES.map((hero) => (
            <button
              key={hero.id}
              id={`hero-card-${hero.id}`}
              className="hero-card"
              style={{ "--hero-color": hero.color, "--hero-accent": hero.accentColor }}
              onClick={() => handleSelect(hero)}
            >
              {/* Glowing badge behind the emoji */}
              <div className="hero-emoji-wrap">
                <div className="hero-glow" />
                <span className="hero-emoji">{hero.emoji}</span>
              </div>

              <div className="hero-card-body">
                <h3 className="hero-name">{hero.name}</h3>
                <p className="hero-title">{hero.title}</p>
                <p className="hero-desc">{hero.description}</p>

                {/* Quick stat readout */}
                <div className="hero-stats">
                  <div className="hero-stat">
                    <span className="stat-icon">❤️</span>
                    <span className="stat-label">HP</span>
                    <span className="stat-val">{hero.maxHealth}</span>
                  </div>
                  <div className="hero-stat">
                    <span className="stat-icon">⚔️</span>
                    <span className="stat-label">ATK</span>
                    <span className="stat-val">{hero.baseAttack[0]}–{hero.baseAttack[1]}</span>
                  </div>
                  <div className="hero-stat">
                    <span className="stat-icon">💥</span>
                    <span className="stat-label">SPEC</span>
                    <span className="stat-val">{hero.specialAttack[0]}–{hero.specialAttack[1]}</span>
                  </div>
                  <div className="hero-stat">
                    <span className="stat-icon">⏱️</span>
                    <span className="stat-label">CD</span>
                    <span className="stat-val">{hero.specialCooldown} rnd</span>
                  </div>
                </div>
              </div>

              <div className="hero-card-footer">
                <span>SELECT</span>
                <span className="select-arrow">→</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HeroSelect;
