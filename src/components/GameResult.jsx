function GameResult({ winnerText, onRestart }) {
  return (
    <section id="result" className="container">
      <h2>Game Over!</h2>
      <p>{winnerText}</p>
      <button onClick={onRestart}>Start New Game</button>
    </section>
  );
}

export default GameResult;
