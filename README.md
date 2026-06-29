# ⚔️ Monster Slayer V2 — Clash Edition

> *"TSL never stops. Manual or AI, we keep building."*

![Monster Slayer V2](https://img.shields.io/badge/Version-2.0-gold?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![Status](https://img.shields.io/badge/Status-In%20Progress-orange?style=for-the-badge)

---

## 🏫 Origin Story

This project **started as a lab assignment** from a React.js course — a simple monster slayer game to practice reactive state, event handling, and component communication. The original V1 had:

- One hero, one monster
- Basic attack / special attack / heal / surrender buttons
- A plain battle log
- Minimal styling

I finished the lab... and then I couldn't stop thinking about it.

---

## 💡 Why V2 Exists

I have a background in **game development**, so the moment I saw the core loop — turn-based combat, resource management, escalating difficulty — my brain immediately went to **Clash of Clans**. The whole CoC meta (hero abilities, wave progression, star ratings, cooldown systems) maps perfectly onto a browser game.

I used **AI as a co-pilot** to accelerate the build. Not to replace my thinking, but to help me move faster on the parts I already understood — component architecture, CSS animations, Web Audio synthesis. Every design decision came from game dev intuition; the AI helped execute at speed.

This is what V2 became: a full CoC-inspired overhaul built for fun, on top of a school assignment.

---

## 🎮 What's New in V2

| Feature | V1 | V2 |
|---|---|---|
| Hero selection | ❌ hardcoded | ✅ 3 unique heroes (Barbarian, Archer, Wizard) |
| Enemies | 1 monster | ✅ 3 wave-based enemies (Goblin → Orc → Dragon) |
| Special attack | unlocks at round 3 | ✅ per-hero cooldown system |
| Sound | ❌ none | ✅ synthesized via Web Audio API (no files!) |
| Hit animations | ❌ none | ✅ shake on hit, glow on special, float particles |
| Health bar | static green | ✅ smooth transitions — green → yellow → red |
| Battle log | plain text list | ✅ color-coded, animated, actor-aware |
| Victory screen | one button | ✅ ⭐ 1–3 star rating based on performance |
| Between waves | ❌ | ✅ partial HP recovery + wave-clear overlay |
| Design | plain HTML | ✅ dark CoC-style — gold, stone textures, Cinzel font |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/thangsaoly/w10-game-moster-slayer.git
cd w10-game-moster-slayer

# Install dependencies
npm install

# Run dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Project Structure

```
src/
├── gameData.js           # All heroes & monsters as pure data objects
├── sounds.js             # Web Audio API synth engine — zero audio files
├── App.jsx               # Screen router (HeroSelect ↔ Battle)
├── index.css             # CoC dark fantasy design system
└── components/
    ├── HeroSelect.jsx    # Champion picker with stat cards
    ├── Battle.jsx        # Full combat engine
    ├── HealthBar.jsx     # Animated HP bar with color shift
    ├── ActionControls.jsx # 4 action buttons with cooldown display
    ├── BattleLog.jsx     # Scrollable, color-coded combat feed
    ├── WaveResult.jsx    # Wave-cleared overlay
    └── GameOver.jsx      # Victory / defeat + star rating
```

> **Want to add a new hero or monster?** Drop one object into `gameData.js`. No logic changes needed — the rest auto-adapts.

---

## 🔮 Planned for V3+

Things I want to explore next (with or without AI assist):

- [ ] **Inventory system** — consumable potions & scrolls
- [ ] **Passive abilities** — each hero gets a triggered passive (e.g. Barbarian rage stacks)
- [ ] **Monster AI variation** — monsters that have their own specials
- [ ] **Persistent progression** — localStorage-based gold & unlocks
- [ ] **Sprite animations** — CSS/canvas character sprites
- [ ] **Boss encounters** — ultra-HP bosses with multi-phase attacks
- [ ] **PvP mode** — two players on the same keyboard
- [ ] **Full CoC clan theme** — clan name display, war log style history

---

## 🛠️ Tech Stack

- **React 18** + **Vite 5** — fast dev, clean component model
- **Vanilla CSS** — no Tailwind, full control over the dark fantasy aesthetic
- **Web Audio API** — all sounds synthesized in JS, no asset downloads
- **Google Fonts** — Cinzel (medieval serif) for authentic CoC-style typography

---

## 👨‍💻 About

Built by **TSL** (Thangsaoly) — a developer who doesn't stop building, whether it's manual craft or AI-assisted sprints.

This project lives at the intersection of:
- A **school lab assignment** that got out of hand (in the best way)
- **Game dev experience** applied to web tech
- **AI-assisted development** used the right way — as a force multiplier, not a replacement for thinking

> *The loop is simple: learn it in class → push it further on your own → never stop.*

---

## 📄 License

MIT — do whatever you want with it. Just keep building.
