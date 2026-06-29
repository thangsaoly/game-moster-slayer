import { useState, useCallback, useRef } from "react";
import { MONSTERS } from "../gameData.js";
import { sounds } from "../sounds.js";
import HealthBar from "./HealthBar.jsx";
import ActionControls from "./ActionControls.jsx";
import BattleLog from "./BattleLog.jsx";
import WaveResult from "./WaveResult.jsx";
import GameOver from "./GameOver.jsx";

// =============================================================================
// HELPERS
// =============================================================================

/** Returns a random integer between min (inclusive) and max (exclusive). */
function roll(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/** Builds a log entry for attack events. */
function logAttack(isHero, damage, isSpecial = false) {
  return { id: Date.now() + Math.random(), isHero, isDamage: true, isSpecial, damage };
}

/** Builds a log entry for heal events. */
function logHeal(amount) {
  return { id: Date.now() + Math.random(), isHero: true, isDamage: false, isSpecial: false, damage: amount };
}

/** Builds a log entry for special narrative events. */
function logEvent(text) {
  return { id: Date.now() + Math.random(), isHero: null, isDamage: false, isSpecial: false, text };
}

// =============================================================================
// BATTLE — The main game arena component
// =============================================================================
function Battle({ hero, onReturnToSelect }) {
  // --- Current wave (0-indexed into MONSTERS array) ---
  const [waveIndex, setWaveIndex] = useState(0);
  const currentMonster = MONSTERS[waveIndex];

  // --- Health state ---
  const [heroHealth, setHeroHealth] = useState(hero.maxHealth);
  const [monsterHealth, setMonsterHealth] = useState(currentMonster.maxHealth);

  // --- Special attack cooldown: counts DOWN from cooldown to 0 ---
  // When it hits 0, the special is ready. Starts ready (0).
  const [specialCooldownLeft, setSpecialCooldownLeft] = useState(0);

  // --- Battle log ---
  const [logs, setLogs] = useState([logEvent(`⚔️ Battle begins! ${hero.name} faces the ${currentMonster.name}!`)]);

  // --- Animation triggers ---
  const [heroShake, setHeroShake] = useState(false);
  const [monsterShake, setMonsterShake] = useState(false);
  const [heroGlow, setHeroGlow] = useState(false);

  // --- Game phase: 'battle' | 'wave-won' | 'game-won' | 'game-over' ---
  const [phase, setPhase] = useState("battle");

  // --- Total stars earned across all waves ---
  const [totalStars, setTotalStars] = useState(0);

  // Prevent action spam by tracking if an action is in "cooldown" animation
  const actionLocked = useRef(false);

  const pushLogs = useCallback((newEntries) => {
    setLogs((prev) => [...newEntries, ...prev]);
  }, []);

  const triggerShake = (setter) => {
    setter(true);
    setTimeout(() => setter(false), 500);
  };

  // --------------------------------------------------------------------------
  // CORE ACTION: process a hero action + monster counter-attack
  // --------------------------------------------------------------------------
  const processAction = useCallback(
    (heroAction) => {
      if (phase !== "battle" || actionLocked.current) return;
      actionLocked.current = true;

      // Step 1: Hero acts
      let newMonsterHp = monsterHealth;
      let newHeroHp = heroHealth;
      const newLogs = [];

      if (heroAction.type === "attack") {
        const dmg = roll(...hero.baseAttack);
        newMonsterHp = Math.max(0, monsterHealth - dmg);
        newLogs.push(logAttack(true, dmg, false));
        sounds.attack();
        triggerShake(setMonsterShake);

      } else if (heroAction.type === "special") {
        const dmg = roll(...hero.specialAttack);
        newMonsterHp = Math.max(0, monsterHealth - dmg);
        newLogs.push(logAttack(true, dmg, true));
        sounds.specialAttack();
        triggerShake(setMonsterShake);
        setHeroGlow(true);
        setTimeout(() => setHeroGlow(false), 800);

      } else if (heroAction.type === "heal") {
        const healAmt = roll(...hero.healRange);
        newHeroHp = Math.min(hero.maxHealth, heroHealth + healAmt);
        newLogs.push(logHeal(healAmt));
        sounds.heal();
      }

      // Step 2: Monster counter-attacks (unless monster just died)
      if (newMonsterHp > 0) {
        const monsterDmg = roll(...currentMonster.attackRange);
        newHeroHp = Math.max(0, newHeroHp - monsterDmg);
        newLogs.push(logAttack(false, monsterDmg, false));
        sounds.monsterAttack();
        triggerShake(setHeroShake);
      }

      // Step 3: Advance special cooldown
      setSpecialCooldownLeft((prev) => Math.max(0, prev - 1));
      if (heroAction.type === "special") {
        setSpecialCooldownLeft(hero.specialCooldown);
      }

      // Step 4: Commit state
      setMonsterHealth(newMonsterHp);
      setHeroHealth(newHeroHp);
      pushLogs(newLogs);

      // Step 5: Determine outcome
      setTimeout(() => {
        if (newHeroHp === 0) {
          // Hero dead → game over
          sounds.defeat();
          pushLogs([logEvent("💀 The hero has fallen...")]);
          setPhase("game-over");
        } else if (newMonsterHp === 0) {
          // Monster defeated
          const isLastWave = waveIndex >= MONSTERS.length - 1;
          sounds.waveComplete();
          pushLogs([logEvent(`🏆 ${currentMonster.name} has been slain!`)]);
          setTotalStars((prev) => prev + currentMonster.reward.length); // reward string length = star count
          if (isLastWave) {
            sounds.victory();
            setPhase("game-won");
          } else {
            setPhase("wave-won");
          }
        }

        actionLocked.current = false;
      }, 300);
    },
    [phase, monsterHealth, heroHealth, hero, currentMonster, waveIndex, pushLogs]
  );

  // --------------------------------------------------------------------------
  // HANDLERS passed down to ActionControls
  // --------------------------------------------------------------------------
  const handleAttack = () => processAction({ type: "attack" });

  const handleSpecialAttack = () => {
    if (specialCooldownLeft > 0) return;
    processAction({ type: "special" });
  };

  const handleHeal = () => processAction({ type: "heal" });

  const handleSurrender = () => {
    if (phase !== "battle") return;
    sounds.defeat();
    pushLogs([logEvent("🏳️ You have surrendered...")]);
    setPhase("game-over");
  };

  // --------------------------------------------------------------------------
  // ADVANCE to the next wave
  // --------------------------------------------------------------------------
  const handleNextWave = () => {
    sounds.buttonClick();
    const nextIndex = waveIndex + 1;
    const nextMonster = MONSTERS[nextIndex];

    setWaveIndex(nextIndex);
    setMonsterHealth(nextMonster.maxHealth);
    // Partial hero heal between waves (10–25 HP bonus)
    setHeroHealth((prev) => Math.min(hero.maxHealth, prev + roll(10, 25)));
    setSpecialCooldownLeft(0);
    setPhase("battle");
    pushLogs([logEvent(`🌊 Wave ${nextIndex + 1}! ${nextMonster.name} appears!`)]);
  };

  // --------------------------------------------------------------------------
  // RESTART full game
  // --------------------------------------------------------------------------
  const handleRestart = () => {
    sounds.buttonClick();
    setWaveIndex(0);
    setHeroHealth(hero.maxHealth);
    setMonsterHealth(MONSTERS[0].maxHealth);
    setSpecialCooldownLeft(0);
    setLogs([logEvent(`⚔️ A new battle begins! ${hero.name} faces the ${MONSTERS[0].name}!`)]);
    setPhase("battle");
    setTotalStars(0);
  };

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return (
    <div className="battle-screen">
      {/* Background particles */}
      <div className="bg-particles battle-bg" aria-hidden="true">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="particle ember" style={{ "--i": i }} />
        ))}
      </div>

      {/* Wave indicator banner */}
      <div className="wave-banner">
        <span className="wave-tag">Wave {waveIndex + 1} / {MONSTERS.length}</span>
        <span className="wave-monster">vs {currentMonster.emoji} {currentMonster.name}</span>
        <span className="wave-reward">{currentMonster.reward}</span>
      </div>

      {/* Arena — hero vs monster */}
      <div className="arena">
        {/* Hero side */}
        <div className={`combatant-panel hero-panel ${heroShake ? "shake" : ""} ${heroGlow ? "glow-special" : ""}`}>
          <div className="combatant-emoji">{hero.emoji}</div>
          <div className="combatant-name" style={{ color: hero.accentColor }}>{hero.name}</div>
          <HealthBar
            value={heroHealth}
            maxValue={hero.maxHealth}
            label={`${heroHealth} / ${hero.maxHealth}`}
            color={hero.color}
            isHero
          />
        </div>

        {/* VS divider */}
        <div className="vs-badge">VS</div>

        {/* Monster side */}
        <div className={`combatant-panel monster-panel ${monsterShake ? "shake" : ""}`}>
          <div className="combatant-emoji">{currentMonster.emoji}</div>
          <div
            className="combatant-name"
            style={{ color: currentMonster.color }}
          >
            {currentMonster.name}
          </div>
          <HealthBar
            value={monsterHealth}
            maxValue={currentMonster.maxHealth}
            label={`${monsterHealth} / ${currentMonster.maxHealth}`}
            color={currentMonster.color}
            isHero={false}
          />
        </div>
      </div>

      {/* Action buttons */}
      {phase === "battle" && (
        <ActionControls
          hero={hero}
          onAttack={handleAttack}
          onSpecialAttack={handleSpecialAttack}
          onHeal={handleHeal}
          onSurrender={handleSurrender}
          specialCooldownLeft={specialCooldownLeft}
        />
      )}

      {/* Wave-won overlay */}
      {phase === "wave-won" && (
        <WaveResult
          monster={currentMonster}
          onNextWave={handleNextWave}
        />
      )}

      {/* Game won overlay */}
      {phase === "game-won" && (
        <GameOver
          isVictory
          totalStars={totalStars}
          hero={hero}
          onRestart={handleRestart}
          onReturnToSelect={onReturnToSelect}
        />
      )}

      {/* Game over overlay */}
      {phase === "game-over" && (
        <GameOver
          isVictory={false}
          totalStars={totalStars}
          hero={hero}
          onRestart={handleRestart}
          onReturnToSelect={onReturnToSelect}
        />
      )}

      {/* Battle log */}
      <BattleLog logs={logs} hero={hero} monster={currentMonster} />
    </div>
  );
}

export default Battle;
