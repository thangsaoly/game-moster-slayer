// =============================================================================
// HealthBar — Animated health bar with color transition (green → yellow → red)
// =============================================================================
function HealthBar({ value, maxValue, label, color, isHero }) {
  const percentage = Math.max(0, (value / maxValue) * 100);

  // Color shifts based on HP percentage — green → yellow → red
  let barColor;
  if (percentage > 60) {
    barColor = isHero ? color : "#e53935"; // hero uses theme color, monster stays red
  } else if (percentage > 30) {
    barColor = "#f9a825"; // yellow warning
  } else {
    barColor = "#c62828"; // critical red
  }

  return (
    <div className="health-bar-container">
      <div className="health-bar-track">
        <div
          className="health-bar-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: barColor,
          }}
        />
        {/* Shine overlay */}
        <div className="health-bar-shine" />
      </div>
      <div className="health-bar-label">{label}</div>
    </div>
  );
}

export default HealthBar;
