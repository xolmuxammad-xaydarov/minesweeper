export function createBoard(boardSize, numberOfMines) {
  const board = [];
  const minePositions = getMinePositions(boardSize, numberOfMines);
  for (let x = 0; x < boardSize; x += 1) {
    const row = [];
    for (let y = 0; y < boardSize; y += 1) {
      const element = document.createElement('div');
      element.dataset.status = 'hidden';
      const box = {
        element,
        x,
        y,
        mine: minePositions.some((p) => positionMatch(p, { x, y })),

        get status() {
          return this.element.dataset.status;
        },
        set status(value) {
          this.element.dataset.status = value;
        },
      };

      row.push(box);
    }
    board.push(row);
  }
  return board;
}

function getMinePositions(boardSize, numberOfMines) {
  const positions = [];

  while (positions.length < numberOfMines) {
    const position = {
      x: randomNUmber(boardSize),
      y: randomNUmber(boardSize),
    };

    if (!positions.some((p) => positionMatch(p, position))) {
      positions.push(position);
    }
  }

  return positions;
}

function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y;
}

function randomNUmber(size) {
  return Math.floor(Math.random() * size);
}

export function markBox(box) {
  if (box.status !== 'hidden' && box.status !== 'marked') {
    return;
  }

  if (box.status === 'marked') {
    box.status = 'hidden';
  } else {
    box.status = 'marked';
  }
}

export function revealBox(board, box) {
  if (box.status !== 'hidden') {
    return;
  }

  if (box.mine) {
    box.status = 'mine';
    return;
  }
  box.status = 'number';
  const adjacentBoxes = nearByBox(board, box);
  const mines = adjacentBoxes.filter((b) => b.mine);
  if (mines.length === 0) {
    adjacentBoxes.forEach(revealBox.bind(null, board));
  } else {
    box.element.textContent = mines.length;
    if (box.element.textContent === '1') {
      box.element.style.color = 'blue';
    } else if (box.element.textContent === '3') {
      box.element.style.color = 'red';
    } else if (box.element.textContent === '2') {
      box.element.style.color = 'green';
    } else if (box.element.textContent >= '4') {
      box.element.style.color = 'pink';
    }
  }
}

export function checkWin(board) {
  return board.every((row) => row.every(
    (box) => box.status === 'number'
    || (box.mine && (box.status === 'hidden' || box.status === 'marked')),
  ));
}

export function checkLose(board) {
  return board.some((row) => row.some((box) => box.status === 'mine'));
}

function nearByBox(board, { x, y }) {
  const boxes = [];

  for (let xOffset = -1; xOffset <= 1; xOffset += 1) {
    for (let yOffset = -1; yOffset <= 1; yOffset += 1) {
      const box = board[x + xOffset]?.[y + yOffset];
      if (box) boxes.push(box);
    }
  }
  return boxes;
}
