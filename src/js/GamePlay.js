/* eslint-disable no-restricted-syntax */

export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
    this.cellClickListeners = [];
    this.goblin = document.createElement('img');
    this.goblin.setAttribute('src', './img/goblin.png');
    this.goblin.setAttribute('height', '100px');
    this.goblin.setAttribute('width', '100px');
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  drawUi() {
    this.checkBinding();

    this.container.innerHTML = `
      <div id="status">
        <p>Health: <span id="health">5</span></p>
        <p>Score: <span id="score">0</span></p>
      </div>
      <div id="board">
      </div>
    `;
    this.boardEl = document.getElementById('board');

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('map-tile');
      cellEl.addEventListener('click', event => this.onCellClick(event));
      this.boardEl.appendChild(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);
    this.healthEl = document.getElementById('health');
    this.scoreEl = document.getElementById('score');
  }

  /**
   * Draws positions (with chars) on boardEl
   *
   * @param positions array of PositionedCharacter objects
   */
  drawGoblin(position) {
    this.clearBoard();

    const cellEl = this.boardEl.children[position];
    cellEl.appendChild(this.goblin);
  }

  redrawStatus(health, score) {
    this.healthEl.innerHTML = health;
    this.scoreEl.innerHTML = score;
  }

  clearBoard() {
    for (const cell of this.cells) {
      cell.innerHTML = '';
    }
  }

  /**
   * Add listener to mouse click for cell
   *
   * @param callback
   */
  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

  clearCellClickListener() {
    this.cellClickListeners = [];
  }

  onCellClick(event) {
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach(o => o.call(null, index));
  }

  setCursor(cursor) {
    this.boardEl.style.cursor = cursor;
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }
}
