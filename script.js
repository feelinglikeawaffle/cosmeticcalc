// Spawn table with rolls + rarity per roll
const spawnData = {
  1: { rolls: [20], rarities: [{ g: 69.9, b: 28.2, p: 1.9, y: 0.0 }] },
  2: { rolls: [28], rarities: [{ g: 66.44, b: 29.92, p: 3.62, y: 0.02 }] },
  3: { rolls: [36], rarities: [{ g: 62.02, b: 31.69, p: 6.11, y: 0.19 }] },
  4: { rolls: [44], rarities: [{ g: 56.30, b: 33.47, p: 9.56, y: 0.66 }] },
  5: { rolls: [52], rarities: [{ g: 48.83, b: 35.25, p: 14.30, y: 1.62 }] },

  6: {
    rolls: [60, 20],
    rarities: [
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 },
      { g: 69.90, b: 28.20, p: 1.90, y: 0.00 }
    ]
  },

  7: {
    rolls: [60, 28],
    rarities: [
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 },
      { g: 66.44, b: 29.92, p: 3.62, y: 0.02 }
    ]
  },

  8: {
    rolls: [60, 36],
    rarities: [
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 },
      { g: 62.02, b: 31.69, p: 6.11, y: 0.19 }
    ]
  },

  9: {
    rolls: [60, 44],
    rarities: [
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 },
      { g: 56.30, b: 33.47, p: 9.56, y: 0.66 }
    ]
  },

  10: {
    rolls: [60, 52],
    rarities: [
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 },
      { g: 48.83, b: 35.25, p: 14.30, y: 1.62 }
    ]
  },

  11: {
    rolls: [60, 60, 20],
    rarities: [
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 },
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 },
      { g: 69.90, b: 28.20, p: 1.90, y: 0.00 }
    ]
  },

  12: {
    rolls: [60, 60, 28],
    rarities: [
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 },
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 },
      { g: 66.44, b: 29.92, p: 3.62, y: 0.02 }
    ]
  },

  13: {
    rolls: [60, 60, 36],
    rarities: [
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 },
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 },
      { g: 62.02, b: 31.69, p: 6.11, y: 0.19 }
    ]
  },

  14: {
    rolls: [60, 60, 44],
    rarities: [
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 },
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 },
      { g: 56.30, b: 33.47, p: 9.56, y: 0.66 }
    ]
  },

  15: {
    rolls: [60, 60, 52],
    rarities: [
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 },
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 },
      { g: 48.83, b: 35.25, p: 14.30, y: 1.62 }
    ]
  },

  16: {
    rolls: [60, 60, 60],
    rarities: [
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 },
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 },
      { g: 38.87, b: 37.03, p: 20.83, y: 3.27 }
    ]
  }
};

function getLevelData(level) {
  return level <= 16 ? spawnData[level] : spawnData[16];
}

function fmt(x) {
  return x.toFixed(2) + "%";
}

function calculate() {
  const level = Math.max(1, parseInt(levelInput.value));
  const streak = Math.max(0, parseInt(streakInput.value));

  const data = getLevelData(level);
  const multiplier = Math.pow(1.05, streak);

  const rolls = data.rolls.map(r => Math.min(100, r * multiplier));
  const rarities = data.rarities;

  // Build roll table
  let html = `<table><tr><th>Type</th>`;
  rolls.forEach((_, i) => html += `<th>Roll ${i + 1}</th>`);
  html += `</tr>`;

  // Spawn row
  html += `<tr><td>Spawn Chance</td>`;
  rolls.forEach(r => html += `<td>${fmt(r)}</td>`);
  html += `</tr>`;

  // Rarity rows
  ["g", "b", "p", "y"].forEach(key => {
    const label = { g: "Green", b: "Blue", p: "Purple", y: "Yellow" }[key];
    html += `<tr><td>${label}</td>`;
    rolls.forEach((r, i) => {
      const chance = r * (rarities[i][key] / 100);
      html += `<td>${fmt(chance)}</td>`;
    });
    html += `</tr>`;
  });

  html += `</table>`;
  rollTableWrapper.innerHTML = html;

  // Multi-box probabilities
  const p = rolls.map(r => r / 100);
  const p0 = p.reduce((acc, x) => acc * (1 - x), 1);
  const p1 = p.reduce((sum, x, i) => sum + x * p.filter((_, j) => j !== i).reduce((acc, y) => acc * (1 - y), 1), 0);
  const p2 = p.length >= 2
    ? p[0] * p[1] * (p[2] ? (1 - p[2]) : 1)
    : 0;
  const p3 = p.length === 3 ? p[0] * p[1] * p[2] : 0;

  const totalSpawn = 1 - p0;
  const expected = p.reduce((a, b) => a + b, 0);

  totalSpawnEl.textContent = fmt(totalSpawn * 100);
  expectedBoxes.textContent = expected.toFixed(3);

  chance0.textContent = fmt(p0 * 100);
  chance1.textContent = fmt(p1 * 100);
  chance2.textContent = fmt(p2 * 100);
  chance3.textContent = fmt(p3 * 100);

  // Total rarity
  let total = { g: 0, b: 0, p: 0, y: 0 };
  rolls.forEach((r, i) => {
    total.g += r * (rarities[i].g / 100);
    total.b += r * (rarities[i].b / 100);
    total.p += r * (rarities[i].p / 100);
    total.y += r * (rarities[i].y / 100);
  });

  totalGreen.textContent = fmt(total.g);
  totalBlue.textContent = fmt(total.b);
  totalPurple.textContent = fmt(total.p);
  totalYellow.textContent = fmt(total.y);

  results.classList.remove("hidden");
}

const levelInput = document.getElementById("levelInput");
const streakInput = document.getElementById("streakInput");
const results = document.getElementById("results");

const rollTableWrapper = document.getElementById("rollTableWrapper");

const totalSpawnEl = document.getElementById("totalSpawn");
const expectedBoxes = document.getElementById("expectedBoxes");

const chance0 = document.getElementById("chance0");
const chance1 = document.getElementById("chance1");
const chance2 = document.getElementById("chance2");
const chance3 = document.getElementById("chance3");

const totalGreen = document.getElementById("totalGreen");
const totalBlue = document.getElementById("totalBlue");
const totalPurple = document.getElementById("totalPurple");
const totalYellow = document.getElementById("totalYellow");

document.getElementById("calcButton").addEventListener("click", calculate);
