import { gameLoop } from "./game";
import modal from "./modal";
import { autoplay } from "./utils/autoplay";
import { $, cE } from "./utils/dom-utils";
import { capitalize, createId } from "./utils/string-utils";
import {
  highLightShip,
  selectShipToPlaceOnBoard,
  createFleet,
  showSelectedShip,
  registerClickOnModal,
  isEndCoordValid,
  isStartCoordValid,
  removeSecondValidCoordOnBoard,
} from "./utils/ui-utils";

// Provide id when creating a modal
function createPlayerBoard(id, boardOwner, otherPlayer, shipIndex, fleet) {
  let count = 1;
  const boardUI = cE("div");
  boardUI.id = id
    ? `${id}-${createId(boardOwner.name)}`
    : createId(boardOwner.name);

  boardUI.classList.add("board");
  for (let row = 1; row <= boardOwner.board.boardWidth; row++) {
    const rowDiv = cE("div");
    rowDiv.id = id ? `${id}-r-${row}` : `r-${row}`;
    rowDiv.classList.add("row");

    for (let cell = 1; cell <= boardOwner.board.boardheight; cell++) {
      const cellDiv = cE("div");
      cellDiv.id = `${boardUI.id}-${count}`;
      cellDiv.classList.add("cell");
      cellDiv.dataset.pos = count;
      cellDiv.onclick = (e) => {
        // Modal eventListener
        if ($("#modal-overlay")) {
          const ship = selectShipToPlaceOnBoard(fleet, shipIndex);
          if (ship) {
            if (ship.start) {
              if (parseInt(cellDiv.dataset.pos) === ship.start) {
                // Remove current ship if ship's start coordinate clicked 2 times.
                ship.start = null;
                removeSecondValidCoordOnBoard(cellDiv, boardOwner.gameboard);
              } else {
                if (ship.length > 1) {
                  if (
                    isEndCoordValid(
                      cellDiv.dataset.pos,
                      ship,
                      boardOwner.gameboard,
                    )
                  ) {
                    shipIndex -= 1;
                    registerClickOnModal(
                      boardOwner,
                      cellDiv,
                      ship,
                      fleet,
                      shipIndex,
                    );
                  }
                }
              }
            } else {
              if (
                !isStartCoordValid(
                  cellDiv.dataset.pos,
                  ship,
                  boardOwner.gameboard,
                )
              ) {
                return;
              }
              if (ship.length === 1) {
                if (shipIndex === 0) {
                  const doneBtn = $("#done-btn");
                  const cancelBtn = $("#cancel-btn");
                  doneBtn.disabled = false;
                  doneBtn.style.backgroundColor = "#018881";
                  doneBtn.style.color = "#fff";
                  cancelBtn.style.backgroundColor = "";
                  cancelBtn.style.color = "#000";
                }
                shipIndex -= 1;
              }
              registerClickOnModal(boardOwner, cellDiv, ship, fleet, shipIndex);
            }
          }
        }

        // Game board event listener.
        // Check if the player have aleady played on the current location.
        if (
          !boardOwner.isTurn &&
          !boardOwner.board.hit.has(parseInt(cellDiv.dataset.pos)) &&
          !boardOwner.board.missed.has(parseInt(cellDiv.dataset.pos)) &&
          boardOwner.board.shipLocation.size > 0 &&
          otherPlayer.board.shipLocation.size > 0 &&
          !boardOwner.board.allShipSunk()
        ) {
          // Prevent mouse click on the player 1 board.
          if (boardOwner.name === "player 1" && e.pointerId > 0) {
            return;
          }
          gameLoop(cellDiv, boardOwner, otherPlayer);
          autoplay(boardOwner, otherPlayer);
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
  const fleet = createFleet();
  let p1ShipIndex = fleet.length - 1;
  let p2ShipIndex = fleet.length - 1;

  p1Name.textContent = capitalize(player1.name);
  p2Name.textContent = capitalize(player2.name);

  // This expression creates the board for player1.
  const board1 = createPlayerBoard(null, player1, player2, fleet, p1ShipIndex);

  // This expression creates the board for player2.
  const board2 = createPlayerBoard(null, player2, player1, fleet, p2ShipIndex);

  p1BoardC.appendChild(board1);
  p2BoardC.appendChild(board2);
  highLightShip(player2);
  $("#main-c").appendChild(
    modal("m", player1, player2, p1ShipIndex, fleet, createPlayerBoard),
  );
  showSelectedShip(player1, selectShipToPlaceOnBoard(fleet, p1ShipIndex));
}
