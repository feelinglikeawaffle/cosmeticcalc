const spawnTable = {
  1: { base: 20.0, rarities: { g: 69.9, b: 28.2, p: 1.9, y: 0.0 } },
  2: { base: 28.0, rarities: { g: 66.44, b: 29.92, p: 3.62, y: 0.02 } },
  3: { base: 36.0, rarities: { g: 62.02, b: 31.69, p: 6.11, y: 0.19 } },
  4: { base: 44.0, rarities: { g: 56.30, b: 33.47, p: 9.56, y: 0.66 } },
  5: { base: 52.0, rarities: { g: 48.83, b: 35.25, p: 14.30, y: 1.62 } },
  6: { base: 68.0, rarities: { g: 55.49, b: 37.26, p: 15.19, y: 2.22 } },
  7: { base: 71.2, rarities: { g: 56.59, b: 39.78, p: 16.87, y: 2.34 } },
  8: { base: 74.4, rarities: { g: 57.12, b: 42.40, p: 19.10, y: 2.56 } },
  9: { base: 77.6, rarities: { g: 56.87, b: 45.09, p: 22.04, y: 3.03 } },
  10: { base: 80.8, rarities: { g: 55.52, b: 47.86, p: 25.98, y: 3.90 } },
  11: { base: 87.2, rarities: { g: 77.39, b: 62.38, p: 33.58, y: 5.60 } },
  12: { base: 88.5, rarities: { g: 77.38, b: 63.90, p: 35.03, y: 5.70 } },
  13: { base: 89.8, rarities: { g: 77.02, b: 65.45, p: 36.94, y: 5.92 } },
  14: { base: 91.0, rarities: { g: 76.17, b: 67.03, p: 39.43, y: 6.42 } },
  15: { base: 92.3, rarities: { g: 74.67, b: 68.62, p: 42.73, y: 7.33 } },
  16: { base: 93.6, rarities: { g: 72.22, b: 70.23, p: 47.15, y: 8.87 } }
};

function getSpawnData(level) {
  return level <= 16 ? spawnTable[level] : spawnTable[16];
}

function fmt(x) {
  return x.toFixed(2) + "%";
}

function calculate() {
  const level = Math.max(1, parseInt(levelInput.value));
  const streak = Math.max(0, parseInt(streakInput.value));

  const data = getSpawnData(level);
  const base = data.base;
  const r = data.rarities;

  const multiplier = Math.pow(1.2, streak);
  let finalSpawn = base * multiplier;
  if (finalSpawn > 100) finalSpawn = 100;

  const expectedBoxes = finalSpawn / 100;

  const finalGreen = finalSpawn * (r.g / 100);
  const finalBlue = finalSpawn * (r.b / 100);
  const finalPurple = finalSpawn * (r.p / 100);
  const finalYellow = finalSpawn * (r.y / 100);

  results.classList.remove("hidden");

  effectiveLevel.textContent = level > 16 ? `${level} (16+)` : level;
  baseChance.textContent = fmt(base);
  multiplierEl.textContent = multiplier.toFixed(3) + "x";
  finalSpawnEl.textContent = fmt(finalSpawn);
  expectedBoxesEl.textContent = expectedBoxes.toFixed(3);

  finalGreenEl.textContent = fmt(finalGreen);
  finalBlueEl.textContent = fmt(finalBlue);
  finalPurpleEl.textContent = fmt(finalPurple);
  finalYellowEl.textContent = fmt(finalYellow);
}

const levelInput = document.getElementById("levelInput");
const streakInput = document.getElementById("streakInput");
const results = document.getElementById("results");

const effectiveLevel = document.getElementById("effectiveLevel");
const baseChance = document.getElementById("baseChance");
const multiplierEl = document.getElementById("multiplier");
const finalSpawnEl = document.getElementById("finalSpawn");
const expectedBoxesEl = document.getElementById("expectedBoxes");

const finalGreenEl = document.getElementById("finalGreen");
const finalBlueEl = document.getElementById("finalBlue");
const finalPurpleEl = document.getElementById("finalPurple");
const finalYellowEl = document.getElementById("finalYellow");

document.getElementById("calcButton").addEventListener("click", calculate);
