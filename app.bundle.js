!function(e){var t={};function i(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=2)}([function(e,t,i){},function(e,t,i){e.exports=i.p+"img/goblin.png"},function(e,t,i){"use strict";i.r(t);i(0);const n=new class{constructor(){this.boardSize=4,this.container=null,this.boardEl=null,this.cells=[],this.cellClickListeners=[],this.goblin=document.createElement("img"),this.goblin.setAttribute("src","./img/goblin.png"),this.goblin.setAttribute("height","100px"),this.goblin.setAttribute("width","100px")}bindToDOM(e){if(!(e instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=e}drawUi(){this.checkBinding(),this.container.innerHTML='\n      <div id="status">\n        <p>Health: <span id="health">5</span></p>\n        <p>Score: <span id="score">0</span></p>\n      </div>\n      <div id="board">\n      </div>\n    ',this.boardEl=document.getElementById("board");for(let e=0;e<this.boardSize**2;e+=1){const e=document.createElement("div");e.classList.add("map-tile"),e.addEventListener("click",e=>this.onCellClick(e)),this.boardEl.appendChild(e)}this.cells=Array.from(this.boardEl.children),this.healthEl=document.getElementById("health"),this.scoreEl=document.getElementById("score")}drawGoblin(e){this.clearBoard(),this.boardEl.children[e].appendChild(this.goblin)}redrawStatus(e,t){this.healthEl.innerHTML=e,this.scoreEl.innerHTML=t}clearBoard(){for(const e of this.cells)e.innerHTML=""}addCellClickListener(e){this.cellClickListeners.push(e)}clearCellClickListener(){this.cellClickListeners=[]}onCellClick(e){const t=this.cells.indexOf(e.currentTarget);this.cellClickListeners.forEach(e=>e.call(null,t))}setCursor(e){this.boardEl.style.cursor=e}checkBinding(){if(null===this.container)throw new Error("GamePlay not bind to DOM")}};n.bindToDOM(document.getElementById("game-container")),new class{constructor(e){this.gamePlay=e,this.score=0,this.health=5,this.caught=!1}init(){this.gamePlay.addCellClickListener(this.onCellClick.bind(this)),this.newGame()}newGame(){this.gamePlay.drawUi();let e=this.random();this.gamePlay.drawGoblin(e),this.timer=setInterval(()=>{if(this.caught||(this.health-=1),this.gamePlay.redrawStatus(this.health,this.score),0===this.health)return void this.gameOver();let t=this.random();for(;t===e;)t=this.random();e=t,this.gamePlay.drawGoblin(e),this.caught=!1},1e3)}gameOver(){clearTimeout(this.timer),this.gamePlay.clearCellClickListener(),alert("Game over!")}onCellClick(e){this.gamePlay.cells[e].innerHTML&&(this.score+=1,this.gamePlay.clearBoard(),this.caught=!0)}random(){return Math.floor(Math.random()*this.gamePlay.boardSize**2)}}(n).init();i(1)}]);