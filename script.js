// UI

import {
  createBoard,
  markBox,
  revealBox,
  checkWin,
  checkLose,
} from './minesweeper.js';

const BOARD_SIZE = 10;
const NUM_OF_MINES = 10;

const boardBox = document.createElement('div');
const subtitle = document.createElement('div');
document.querySelector('body').prepend(boardBox);
subtitle.classList.add('subtitle');
subtitle.innerHTML = 'Number of mines: <span data-mine-count></span>';
document.querySelector('body').prepend(subtitle);
const minesLeftText = document.querySelector('[data-mine-count]');
minesLeftText.textContent = NUM_OF_MINES;
boardBox.classList.add('board');

const board = createBoard(BOARD_SIZE, NUM_OF_MINES);
boardBox.style.setProperty('--size', BOARD_SIZE);

board.forEach((row) => {
  row.forEach((box) => {
    boardBox.append(box.element);
    box.element.addEventListener('click', () => {
      revealBox(board, box);
      checkGameEnd(box);
    });
    box.element.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      markBox(box);
      listMinesLeft();
    });
  });
});

function listMinesLeft() {
  const markedBoxCount = board.reduce(
    (count, row) => count + row.filter((box) => box.status === 'marked').length,
    0,
  );

  minesLeftText.textContent = NUM_OF_MINES - markedBoxCount;
}

function checkGameEnd() {
  const win = checkWin(board);
  const lose = checkLose(board);

  if (win || lose) {
    boardBox.addEventListener('click', stopProp, { capture: true });
    boardBox.addEventListener('contextmenu', stopProp, { capture: true });
  }

  if (win) {
    subtitle.textContent = 'You win';
  }

  if (lose) {
    subtitle.textContent = 'You lose';
    board.forEach((row) => {
      row.forEach((b) => {
        if (b.status === 'marked') markBox(b);
        if (b.mine) revealBox(board, b);
      });
    });
  }
}

function stopProp(e) {
  e.stopImmediatePropagation();
}
