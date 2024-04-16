import { gameLoop } from "./game";
import { $, cE } from "./utils/dom-utils";
import { capitalize } from "./utils/string-utils";
import { highLightShip } from "./utils/ui-utils";

function createPlayerBoard(boardOwner, otherPlayer) {
  let count = 1;
  const boardUI = cE("div");
  boardUI.id = boardOwner.name.split(" ").join("");
  boardUI.classList.add("board");
  for (let row = 1; row <= boardOwner.board.boardWidth; row++) {
    const rowDiv = cE("div");
    rowDiv.id = `r-${row}`;
    rowDiv.classList.add("row");

    for (let cell = 1; cell <= boardOwner.board.boardheight; cell++) {
      const cellDiv = cE("div");
      cellDiv.id = `${boardUI.id}-${count}`;
      cellDiv.classList.add("cell");
      cellDiv.dataset.pos = count;
      cellDiv.onclick = () => {
        /** Check if the player hit the ship so he/she/it can player attack again.
         *  And make sure the player
         *  only play ones if he/she/it misses.
         */

        if (
          !boardOwner.isTurn &&
          !boardOwner.board.hit.has(parseInt(cellDiv.dataset.pos)) &&
          !boardOwner.board.missed.has(parseInt(cellDiv.dataset.pos))
        ) {
          gameLoop(cellDiv, boardOwner, otherPlayer);
        }
      };
      count++;
      rowDiv.appendChild(cellDiv);
    }
    boardUI.appendChild(rowDiv);
  }

  return boardUI;
}

export default function createUI(player1, player2) {
  const p1Name = $("#p1-name");
  const p2Name = $("#p2-name");
  const p1BoardC = $("#p1-c");
  const p2BoardC = $("#p2-c");

  p1Name.textContent = capitalize(player1.name);
  p2Name.textContent = capitalize(player2.name);

  // This expression creates the board for player1.
  const board1 = createPlayerBoard(player1, player2);

  // This expression creates the board for player2.
  const board2 = createPlayerBoard(player2, player1);

  p1BoardC.appendChild(board1);
  p2BoardC.appendChild(board2);
  highLightShip(player1);
}
