// =============================================================================
// GAME DATA — All hero and monster definitions live here.
// =============================================================================

export const HEROES = [
  {
    id: "barbarian",
    name: "Barbarian",
    emoji: "🪓",
    title: "King of Rage",
    description: "Raw fury incarnate. Hits hard and heals from battle lust.",
    maxHealth: 120,
    baseAttack: [8, 16],       // [min, max] damage range
    specialAttack: [20, 35],   // Rage smash
    specialName: "RAGE SMASH",
    specialCooldown: 3,         // rounds before special is ready again
    healRange: [15, 22],
    color: "#e05c00",
    accentColor: "#ff9040",
  },
  {
    id: "archer",
    name: "Archer",
    emoji: "🏹",
    title: "Queen of Precision",
    description: "Swift and deadly. Her special pierces armor for guaranteed crits.",
    maxHealth: 90,
    baseAttack: [6, 14],
    specialAttack: [18, 30],   // Arrow storm
    specialName: "ARROW STORM",
    specialCooldown: 2,         // faster cooldown — her tradeoff for lower HP
    healRange: [10, 18],
    color: "#009e6e",
    accentColor: "#00e8a0",
  },
  {
    id: "wizard",
    name: "Wizard",
    emoji: "🧙",
    title: "Grand Sorcerer",
    description: "Master of the arcane. Massive burst damage but slow to recover.",
    maxHealth: 80,
    baseAttack: [5, 18],       // Wider variance — glass cannon
    specialAttack: [25, 45],   // Lightning bolt
    specialName: "LIGHTNING BOLT",
    specialCooldown: 4,         // slowest cooldown — high risk, high reward
    healRange: [12, 20],
    color: "#7b2fff",
    accentColor: "#c080ff",
  },
];

export const MONSTERS = [
  {
    id: "goblin",
    name: "Goblin",
    emoji: "👺",
    title: "Sneaky Raider",
    maxHealth: 80,
    attackRange: [4, 10],
    wave: 1,
    color: "#4caf50",
    reward: "⭐",
  },
  {
    id: "orc",
    name: "Orc",
    emoji: "👹",
    title: "Iron Bruiser",
    maxHealth: 110,
    attackRange: [7, 15],
    wave: 2,
    color: "#ff6b35",
    reward: "⭐⭐",
  },
  {
    id: "dragon",
    name: "Dragon",
    emoji: "🐉",
    title: "Ancient Terror",
    maxHealth: 150,
    attackRange: [10, 22],
    wave: 3,
    color: "#d32f2f",
    reward: "⭐⭐⭐",
  },
];

// How many rounds between each monster auto-attack (on its "turn")
export const MONSTER_TURNS_PER_HERO_ACTION = 1;
