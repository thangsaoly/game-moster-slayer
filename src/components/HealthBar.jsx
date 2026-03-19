function HealthBar({ title, value }) {
  return (
    <section className="container">
      <h2>{title}</h2>
      <div className="healthbar">
        <div className="healthbar__value" style={{ width: `${value}%` }}></div>
      </div>
    </section>
  );
}

export default HealthBar;
