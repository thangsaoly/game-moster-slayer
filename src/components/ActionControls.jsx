function ActionControls({
  onAttack,
  onSpecialAttack,
  onHeal,
  onSurrender,
  specialAttackDisabled,
}) {
  return (
    <section id="controls" className="container">
      <button onClick={onAttack}>ATTACK</button>
      <button disabled={specialAttackDisabled} onClick={onSpecialAttack}>
        SPECIAL ATTACK
      </button>
      <button onClick={onHeal}>HEAL</button>
      <button onClick={onSurrender}>KILL YOUR SELF</button>
    </section>
  );
}

export default ActionControls;
