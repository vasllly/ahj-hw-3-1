/* eslint-disable no-param-reassign */

export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.score = 0;
    this.health = 5;
    this.caught = false;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));

    // TODO: load saved stated from stateService
    this.newGame();
  }

  newGame() {
    this.gamePlay.drawUi();

    // В случайном месте генерируем гоблина
    let id = this.random();
    this.gamePlay.drawGoblin(id);

    this.timer = setInterval(() => {
      if (!this.caught) this.health -= 1;
      this.gamePlay.redrawStatus(this.health, this.score);
      if (this.health === 0) {
        this.gameOver();
        return;
      }
      let newId = this.random();
      while (newId === id) {
        newId = this.random();
      }
      id = newId;
      this.gamePlay.drawGoblin(id);
      this.caught = false;
    }, 1000);
  }

  gameOver() {
    clearTimeout(this.timer);
    this.gamePlay.clearCellClickListener();
    alert('Game over!');
  }

  onCellClick(index) {
    // TODO: react to click
    if (this.gamePlay.cells[index].innerHTML) {
      this.score += 1;
      this.gamePlay.clearBoard();
      this.caught = true;
    }
  }

  random() {
    return Math.floor(Math.random() * (this.gamePlay.boardSize ** 2));
  }
}
