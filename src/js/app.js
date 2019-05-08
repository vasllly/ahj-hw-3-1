/**
 * Entry point of app: don't change this
 */
import GamePlay from './GamePlay';
import GameController from './GameController';

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.getElementById('game-container'));

const gameCtrl = new GameController(gamePlay);
gameCtrl.init();

// don't write your code here
