import { sounds } from "../sounds.js";

// =============================================================================
// ActionControls — The player's action buttons with cooldown indicator.
// =============================================================================
function ActionControls({
  hero,
  onAttack,
  onSpecialAttack,
  onHeal,
  onSurrender,
  specialCooldownLeft,
}) {
  const specialReady = specialCooldownLeft === 0;

  const handleSpecialClick = () => {
    sounds.buttonClick();
    onSpecialAttack();
  };

  const handleAttackClick = () => {
    sounds.buttonClick();
    onAttack();
  };

  const handleHealClick = () => {
    sounds.buttonClick();
    onHeal();
  };

  const handleSurrenderClick = () => {
    sounds.buttonClick();
    onSurrender();
  };

  return (
    <div className="action-controls" id="controls">
      {/* Basic attack */}
      <button
        id="btn-attack"
        className="action-btn attack-btn"
        onClick={handleAttackClick}
      >
        <span className="btn-icon">⚔️</span>
        <span className="btn-label">ATTACK</span>
        <span className="btn-sub">{hero.baseAttack[0]}–{hero.baseAttack[1]} dmg</span>
      </button>

      {/* Special attack with cooldown ring */}
      <button
        id="btn-special"
        className={`action-btn special-btn ${specialReady ? "special-ready" : "special-cooling"}`}
        onClick={handleSpecialClick}
        disabled={!specialReady}
        style={{ "--hero-accent": hero.accentColor }}
      >
        <span className="btn-icon">💥</span>
        <span className="btn-label">{hero.specialName}</span>
        <span className="btn-sub">
          {specialReady
            ? `${hero.specialAttack[0]}–${hero.specialAttack[1]} dmg`
            : `⏱ ${specialCooldownLeft} round${specialCooldownLeft !== 1 ? "s" : ""}`}
        </span>
      </button>

      {/* Heal */}
      <button
        id="btn-heal"
        className="action-btn heal-btn"
        onClick={handleHealClick}
      >
        <span className="btn-icon">💚</span>
        <span className="btn-label">HEAL</span>
        <span className="btn-sub">{hero.healRange[0]}–{hero.healRange[1]} hp</span>
      </button>

      {/* Surrender */}
      <button
        id="btn-surrender"
        className="action-btn surrender-btn"
        onClick={handleSurrenderClick}
      >
        <span className="btn-icon">🏳️</span>
        <span className="btn-label">SURRENDER</span>
        <span className="btn-sub">give up</span>
      </button>
    </div>
  );
}

export default ActionControls;
