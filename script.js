// Hard-coded spawn + rarity table based on your data.
// base = total spawn chance (%), rarities = distribution inside that spawn (%).
// Levels > 16 use the 16+ entry.

const spawnTable = {
  1: {
    base: 20.0,
    rarities: { g: 69.9, b: 28.2, p: 1.9, y: 0.0 }
  },
  2: {
    base: 28.0,
    rarities: { g: 66.44, b: 29.92, p: 3.62, y: 0.02 }
  },
  3: {
    base: 36.0,
    rarities: { g: 62.02, b: 31.69, p: 6.11, y: 0.19 }
  },
  4: {
    base: 44.0,
    rarities: { g: 56.30, b: 33.47, p: 9.56, y: 0.66 }
  },
  5: {
    base: 52.0,
    rarities: { g: 48.83, b: 35.25, p: 14.30, y: 1.62 }
  },
  6: {
    base: 68.0,
    rarities: { g: 55.49, b: 37.26, p: 15.19, y: 2.22 }
  },
  7: {
    base: 71.2,
    rarities: { g: 56.59, b: 39.78, p: 16.87, y: 2.34 }
  },
  8: {
    base: 74.4,
    rarities: { g: 57.12, b: 42.40, p: 19.10, y: 2.56 }
  },
  9: {
    base: 77.6,
    rarities: { g: 56.87, b: 45.09, p: 22.04, y: 3.03 }
  },
  10: {
    base: 80.8,
    rarities: { g: 55.52, b: 47.86, p: 25.98, y: 3.90 }
  },
  11: {
    base: 87.2,
    rarities: { g: 77.39, b: 62.38, p: 33.58, y: 5.60 }
  },
  12: {
    base: 88.5,
    rarities: { g: 77.38, b: 63.90, p: 35.03, y: 5.70 }
  },
  13: {
    base: 89.8,
    rarities: { g: 77.02, b: 65.45, p: 36.94, y: 5.92 }
  },
  14: {
    base: 91.0,
    rarities: { g: 76.17, b: 67.03, p: 39.43, y: 6.42 }
  },
  15: {
    base: 92.3,
    rarities: { g: 74.67, b: 68.62, p: 42.73, y: 7.33 }
  },
  16: {
    base: 93.6,
    rarities: { g: 72.22, b: 70.23, p: 47.15, y: 8.87 }
  }
};

// Get effective entry for a level (16+ uses level 16 data)
function getSpawnData(level) {
  if (level <= 0) level = 1;
  if (level <= 16) {
    return { level, ...spawnTable[level] };
  }
  return { level, ...spawnTable[16] };
}

// Format helper
function fmtPercent(value) {
  return value.toFixed(2) + "%";
}

function calculate() {
  const levelInput = document.getElementById("levelInput");
  const streakInput = document.getElementById("streakInput");

  let level = parseInt(levelInput.value, 10);
  let streak = parseInt(streakInput.value, 10);

  if (isNaN(level) || level < 1) level = 1;
  if (isNaN(streak) || streak < 0) streak = 0;

  const data = getSpawnData(level);
  const baseChance = data.base; // %
  const rarities = data.rarities;

  // Bad luck multiplier: +20% per level without a box
  const multiplier = Math.pow(1.2, streak);
  let finalSpawn = baseChance * multiplier;
  if (finalSpawn > 100) finalSpawn = 100;

  // Base rarity chances (inside base spawn)
  const baseGreen = (baseChance * rarities.g) / 100;
  const baseBlue = (baseChance * rarities.b) / 100;
  const basePurple = (baseChance * rarities.p) / 100;
  const baseYellow = (baseChance * rarities.y) / 100;

  // Final rarity chances (inside final spawn)
  const finalGreen = (finalSpawn * rarities.g) / 100;
  const finalBlue = (finalSpawn * rarities.b) / 100;
  const finalPurple = (finalSpawn * rarities.p) / 100;
  const finalYellow = (finalSpawn * rarities.y) / 100;

  // Update DOM
  document.getElementById("results").classList.remove("hidden");

  document.getElementById("effectiveLevel").textContent =
    level > 16 ? `${level} (using 16+)` : level.toString();

  document.getElementById("baseChance").textContent = fmtPercent(baseChance);
  document.getElementById("multiplier").textContent = multiplier.toFixed(3) + "x";
  document.getElementById("finalSpawn").textContent = fmtPercent(finalSpawn);

  document.getElementById("baseGreen").textContent = fmtPercent(baseGreen);
  document.getElementById("baseBlue").textContent = fmtPercent(baseBlue);
  document.getElementById("basePurple").textContent = fmtPercent(basePurple);
  document.getElementById("baseYellow").textContent = fmtPercent(baseYellow);

  document.getElementById("finalGreen").textContent = fmtPercent(finalGreen);
  document.getElementById("finalBlue").textContent = fmtPercent(finalBlue);
  document.getElementById("finalPurple").textContent = fmtPercent(finalPurple);
  document.getElementById("finalYellow").textContent = fmtPercent(finalYellow);
}

document.getElementById("calcButton").addEventListener("click", calculate);

// Optional: calculate once on load with defaults
calculate();
