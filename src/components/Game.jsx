import { useState } from "react";
import HealthBar from "./HealthBar.jsx";
import ActionControls from "./ActionControls.jsx";
import GameResult from "./GameResult.jsx";
import BattleLog from "./BattleLog.jsx";

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createLogAttack(isHero, damage) {
  return {
    isPlayer: isHero,
    isDamage: true,
    text: ` takes ${damage} damage`,
  };
}

function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: ` heals ${healing} life points`,
  };
}

function Game() {
  const [heroHealth, setHeroHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [logs, setLogs] = useState([]);
  const [roundCount, setRoundCount] = useState(0);

  const gameOver = heroHealth === 0 || monsterHealth === 0;
  const canUseSpecialAttack = roundCount >= 3;

  const handleAttack = () => {
    if (gameOver) {
      return;
    }

    const heroDamage = getRandomValue(5, 12);
    const monsterDamage = getRandomValue(5, 12);

    const nextMonsterHealth = Math.max(0, monsterHealth - heroDamage);
    const nextHeroHealth = Math.max(0, heroHealth - monsterDamage);

    setMonsterHealth(nextMonsterHealth);
    setHeroHealth(nextHeroHealth);
    setLogs((prev) => [
      createLogAttack(true, heroDamage),
      createLogAttack(false, monsterDamage),
      ...prev,
    ]);
    setRoundCount((prev) => prev + 1);
  };

  const handleSpecialAttack = () => {
    if (gameOver) {
      return;
    }

    if (!canUseSpecialAttack) {
      return;
    }

    const heroDamage = getRandomValue(8, 25);
    const monsterDamage = getRandomValue(8, 25);

    const nextMonsterHealth = Math.max(0, monsterHealth - heroDamage);
    const nextHeroHealth = Math.max(0, heroHealth - monsterDamage);

    setMonsterHealth(nextMonsterHealth);
    setHeroHealth(nextHeroHealth);
    setLogs((prev) => [
      createLogAttack(true, heroDamage),
      createLogAttack(false, monsterDamage),
      ...prev,
    ]);
    setRoundCount(0);
  };

  const handleHeal = () => {
    if (gameOver) {
      return;
    }

    const healAmount = getRandomValue(8, 15);
    const monsterDamage = getRandomValue(5, 12);

    const healedHealth = Math.min(100, heroHealth + healAmount);
    const actualHeal = healedHealth - heroHealth;
    const nextHeroHealth = Math.max(0, healedHealth - monsterDamage);

    setHeroHealth(nextHeroHealth);
    setLogs((prev) => {
      const updated = [createLogAttack(false, monsterDamage), ...prev];

      if (actualHeal > 0) {
        updated.unshift(createLogHeal(actualHeal));
      }

      return updated;
    });
    setRoundCount((prev) => prev + 1);
  };

  const handleKillYourself = () => {
    if (gameOver) {
      return;
    }

    setHeroHealth(0);
    setLogs((prev) => [
      {
        isPlayer: true,
        isDamage: false,
        text: " gives up",
      },
      ...prev,
    ]);
  };

  const handleRestart = () => {
    setHeroHealth(100);
    setMonsterHealth(100);
    setLogs([]);
    setRoundCount(0);
  };

  // ----------------------------------------------------------------------------------------------------------
  // JSX FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------

  let winnerText = "";

  if (heroHealth === 0 && monsterHealth === 0) {
    winnerText = "It is a draw!";
  } else if (monsterHealth === 0) {
    winnerText = "Hero has won!";
  } else if (heroHealth === 0) {
    winnerText = "Monster has won!";
  }

  return (
    <>
      <HealthBar title="Hero Health" value={heroHealth} />
      <HealthBar title="Monster Health" value={monsterHealth} />

      {winnerText && (
        <GameResult winnerText={winnerText} onRestart={handleRestart} />
      )}

      {!winnerText && (
        <ActionControls
          onAttack={handleAttack}
          onSpecialAttack={handleSpecialAttack}
          onHeal={handleHeal}
          onSurrender={handleKillYourself}
          specialAttackDisabled={!canUseSpecialAttack}
        />
      )}

      <BattleLog logs={logs} />
    </>
  );
}

export default Game;
