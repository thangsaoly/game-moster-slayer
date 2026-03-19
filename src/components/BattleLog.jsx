function BattleLog({ logs }) {
  return (
    <section id="log" className="container">
      <h2>Battle Log</h2>
      <ul>
        {[...logs].reverse().map((log, index) => (
          <li key={`${log.text}-${index}`}>
            <span className={log.isPlayer ? "log--player" : "log--monster"}>
              {log.isPlayer ? "Hero" : "Monster"}
            </span>
            <span className={log.isDamage ? "log--damage" : "log--heal"}>
              {log.text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BattleLog;
