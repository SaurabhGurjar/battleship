import { $ } from "./utils/dom-utils";
import { capitalize } from "./utils/string-utils";
import { getAttackCoord } from "./utils/ui-utils";

const p1Name = document.querySelector("#p1-name");
const p2Name = document.querySelector("#p2-name");
const p1BoardC = document.querySelector("#p1-c");
const p2BoardC = document.querySelector("#p2-c");

function highLightShip(player) {
  const playerId = player.name.split(" ").join("-");
  const locationsIter = player.gameboard.shipLocation.keys();
  for (const val of locationsIter) {
    $(`#${playerId}-${val}`).classList.add("show-ships");
  }
}

function createPlayerBoard(player, callback) {
  let count = 1;
  const boardUI = document.createElement("div");
  boardUI.id = player.name.split(" ").join("-");
  boardUI.classList.add("board");
  for (let row = 1; row <= player.board.boardWidth; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.id = `r-${row}`;
    rowDiv.classList.add("row");

    for (let cell = 1; cell <= player.board.boardheight; cell++) {
      const cellDiv = document.createElement("div");
      cellDiv.id = `${boardUI.id}-${count}`;
      cellDiv.classList.add("cell");
      cellDiv.dataset.pos = count;
      cellDiv.onclick = () => {
        callback(cellDiv, player);
      }
      count++;
      rowDiv.appendChild(cellDiv);
    }
    boardUI.appendChild(rowDiv);
  }
  return boardUI;
}

export default function createUI(player1, player2) {
  p1Name.textContent = capitalize(player1.name);
  p2Name.textContent = capitalize(player2.name);
  p1BoardC.appendChild(createPlayerBoard(player1, getAttackCoord));
  p2BoardC.appendChild(createPlayerBoard(player2, getAttackCoord));
  highLightShip(player1);
}
