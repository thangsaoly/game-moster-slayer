import { useRef, useEffect } from "react";

// =============================================================================
// BattleLog — Scrollable combat feed, newest events on top.
// =============================================================================
function BattleLog({ logs, hero, monster }) {
  const listRef = useRef(null);

  // Auto-scroll to the top (newest entry) whenever logs update
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [logs]);

  const renderLogEntry = (entry) => {
    // Narrative / system events
    if (entry.isHero === null) {
      return (
        <li key={entry.id} className="log-entry log-event">
          <span>{entry.text}</span>
        </li>
      );
    }

    const actor = entry.isHero ? hero.name : monster.name;
    const actorEmoji = entry.isHero ? hero.emoji : monster.emoji;
    const actorClass = entry.isHero ? "log-hero-name" : "log-monster-name";

    if (!entry.isDamage) {
      // Heal
      return (
        <li key={entry.id} className="log-entry log-heal-entry">
          <span className={actorClass}>{actorEmoji} {actor}</span>
          <span className="log-heal-text"> heals </span>
          <span className="log-heal-amount">+{entry.damage} HP</span>
        </li>
      );
    }

    // Attack or special
    const target = entry.isHero ? monster.name : hero.name;
    const targetEmoji = entry.isHero ? monster.emoji : hero.emoji;
    const entryClass = entry.isSpecial ? "log-special-entry" : "log-damage-entry";

    return (
      <li key={entry.id} className={`log-entry ${entryClass}`}>
        <span className={actorClass}>{actorEmoji} {actor}</span>
        {entry.isSpecial && <span className="log-special-badge"> ✨SPECIAL </span>}
        <span className="log-action-text"> hits </span>
        <span className="log-target">{targetEmoji} {target}</span>
        <span className="log-damage-amount"> for -{entry.damage} HP</span>
      </li>
    );
  };

  return (
    <div className="battle-log" id="log">
      <div className="log-header">
        <span className="log-title">📜 Battle Log</span>
        <span className="log-count">{logs.length} events</span>
      </div>
      <ul ref={listRef} className="log-list">
        {logs.map((entry) => renderLogEntry(entry))}
      </ul>
    </div>
  );
}

export default BattleLog;
