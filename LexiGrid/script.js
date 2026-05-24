const keywordInput = document.querySelector("#keyword");
const wordsInput = document.querySelector("#words");
const generateBtn = document.querySelector("#generate");

const emptyBox = document.querySelector("#empty");
const sparseBox = document.querySelector("#sparse");
const fullBox = document.querySelector("#full");

generateBtn.addEventListener("click", generateGrid);

function generateGrid() {
  const keyword = keywordInput.value.trim().toUpperCase();

  const words = wordsInput.value
    .split(/\n|,/)
    .map((word) => word.trim().toUpperCase())
    .filter((word) => word.length > 0);

  if (!keyword || words.length !== keyword.length) {
    alert("Not possible to align the given words to form the keyword in one column.");
    clearGrids();
    return;
  }

  const result = buildLayout(keyword, words);

  if (!result) {
    alert("Not possible to align the given words to form the keyword in one column.");
    clearGrids();
    return;
  }

  renderGrid(result, "empty", emptyBox);
  renderGrid(result, "sparse", sparseBox);
  renderGrid(result, "full", fullBox);
}

function buildLayout(keyword, words) {
  const placements = [];

  for (let i = 0; i < keyword.length; i++) {
    const word = words[i];
    const requiredLetter = keyword[i];
    const matchIndex = word.indexOf(requiredLetter);

    if (matchIndex === -1) {
      return null;
    }

    placements.push({
      rowIndex: i,
      word,
      requiredLetter,
      matchIndex,
      startColumn: -matchIndex,
      endColumn: word.length - matchIndex - 1,
    });
  }

  const minColumn = Math.min(...placements.map((p) => p.startColumn));
  const maxColumn = Math.max(...placements.map((p) => p.endColumn));
  const width = maxColumn - minColumn + 1;
  const keywordColumn = 0 - minColumn;

  const normalizedPlacements = placements.map((p) => ({
    ...p,
    startColumn: p.startColumn - minColumn,
    endColumn: p.endColumn - minColumn,
  }));

  return {
    keyword,
    words,
    placements: normalizedPlacements,
    width,
    rows: keyword.length,
    keywordColumn,
  };
}

function renderGrid(layout, mode, container) {
  container.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "grid";
  grid.style.gridTemplateColumns = `repeat(${layout.width}, 40px)`;

  const revealSet = getSparseRevealSet(layout);

  for (let row = 0; row < layout.rows; row++) {
    const placement = layout.placements[row];

    for (let col = 0; col < layout.width; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";

      const isKeywordColumn = col === layout.keywordColumn;
      const isLetterCell =
        col >= placement.startColumn && col <= placement.endColumn;

      if (isKeywordColumn) {
        cell.classList.add("keyword");
      }

      if (!isLetterCell) {
        cell.classList.add("block");
      } else {
        const letterIndex = col - placement.startColumn;
        const letter = placement.word[letterIndex];

        if (mode === "full") {
          cell.textContent = letter;
        }

        if (mode === "sparse") {
          const key = `${row}-${col}`;
          if (revealSet.has(key)) {
            cell.textContent = letter;
          }
        }

        // Empty mode intentionally shows no letters
      }

      grid.appendChild(cell);
    }
  }

  container.appendChild(grid);
}

function getSparseRevealSet(layout) {
  const letterCells = [];

  for (let row = 0; row < layout.rows; row++) {
    const placement = layout.placements[row];

    for (let col = placement.startColumn; col <= placement.endColumn; col++) {
      letterCells.push(`${row}-${col}`);
    }
  }

  const visibleCount = Math.max(1, Math.round(letterCells.length * 0.15));

  const shuffled = [...letterCells].sort((a, b) => {
    return seededNumber(layout.keyword + layout.words.join("")) + a.localeCompare(b);
  });

  return new Set(shuffled.slice(0, visibleCount));
}

function seededNumber(text) {
  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) % 100000;
  }

  return hash;
}

function clearGrids() {
  emptyBox.innerHTML = "";
  sparseBox.innerHTML = "";
  fullBox.innerHTML = "";
}
