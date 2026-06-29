import { useState } from "react";
import HeroSelect from "./components/HeroSelect.jsx";
import Battle from "./components/Battle.jsx";

// The top-level App manages which "screen" is shown.
// Once a hero is chosen, we switch to the Battle screen.
function App() {
  // null = on hero select screen; a hero object = in battle
  const [selectedHero, setSelectedHero] = useState(null);

  const handleHeroSelect = (hero) => {
    setSelectedHero(hero);
  };

  const handleReturnToSelect = () => {
    setSelectedHero(null);
  };

  return (
    <div className="app-root">
      {selectedHero === null ? (
        <HeroSelect onSelect={handleHeroSelect} />
      ) : (
        <Battle hero={selectedHero} onReturnToSelect={handleReturnToSelect} />
      )}
    </div>
  );
}

export default App;
