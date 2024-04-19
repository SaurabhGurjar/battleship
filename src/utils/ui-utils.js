import Ship from "../ships";
import attackedPNG from "../static/assets/cracked-glass.png";
import missed2PNG from "../static/assets/missed2.png";

import { $, cE } from "./dom-utils";
import { createId } from "./string-utils";

export function highLightShip(player) {
  const playerId = createId(player.name);
  const locationsIter = player.gameboard.shipLocation.keys();
  for (const val of locationsIter) {
    $(`#${playerId}-${val}`).classList.add("show-ships");
  }
}

export function resetBoardUI(player) {
  const boardLen = player.gameboard.length;
  for (let i = 1; i <= boardLen; i++) {
    $(`#${createId(player.name)}-${i}`).classList.remove("show-ships");  
  }
}

export function createFleet() {
  const fleetShipSize = {
    1: 4,
    2: 2,
    3: 2,
    4: 1,
  };
  const fleet = [];
  for (const key in fleetShipSize) {
    for (let i = 0; i < fleetShipSize[key]; i++) {
      fleet.push(new Ship(parseInt(key)));
    }
  }
  return fleet;
}

function placeAShip(ship, board, start, end) {
  if (
    start + board.boardWidth * (ship.length - 1) === end ||
    end - start === ship.length - 1
  ) {
    // moves this check to registerClick
    board.placeShipOnBoard(ship, parseInt(start), parseInt(end), ship.length);
  } else {
    console.log(
      "The ship can't be place here because the selected point are more or less than the ship length.",
    );
  }
}

function noShipAround(coord, board) {
  const inVaildPositions = [
    1,
    board.boardWidth,
    1 + board.boardWidth,
    1 - board.boardWidth,
  ];
  let shipPlaceToSecondCellFromCurrentCoord = false;
  inVaildPositions.forEach((pos) => {
    if (shipPlaceToSecondCellFromCurrentCoord) return;
    if ((coord - 1) % board.boardWidth === 0) {
      if (!((parseInt(coord) - pos) % board.boardWidth) === 0) {
        if (shipPlaceToSecondCellFromCurrentCoord) return;

        shipPlaceToSecondCellFromCurrentCoord = board.shipLocation.has(
          parseInt(coord) - pos,
        );
      }
      if (!((parseInt(coord) + pos) % board.boardWidth) === 0) {
        if (shipPlaceToSecondCellFromCurrentCoord) return;

        shipPlaceToSecondCellFromCurrentCoord = board.shipLocation.has(
          parseInt(coord) + pos,
        );
      }
    } else {
      shipPlaceToSecondCellFromCurrentCoord = board.shipLocation.has(
        parseInt(coord) - pos,
      );
      if (shipPlaceToSecondCellFromCurrentCoord) return;
      shipPlaceToSecondCellFromCurrentCoord = board.shipLocation.has(
        parseInt(coord) + pos,
      );
    }
  });

  return shipPlaceToSecondCellFromCurrentCoord;
}

export function isEndCoordValid(coord, ship, board) {
  const currentPos = parseInt(coord);
  const validPos = shipValidPos(ship.start, ship, board);
  return (
    (currentPos === validPos.horizontalPos ||
      currentPos === validPos.verticalPos) &&
    !board.shipLocation.has(parseInt(coord))
  );
}

export function isStartCoordValid(coord, ship, board) {
  const validPos = shipValidPos(coord, ship, board);

  return (
    (validPos.horizontalPos || validPos.verticalPos ? true : false) &&
    !board.shipLocation.has(parseInt(coord)) &&
    !noShipAround(coord, board)
  );
}

function shipValidPos(pos, ship, board) {
  const horizontalPos =
    parseInt(pos) + ship.length - 1 > board.length ||
    (parseInt(pos) % board.boardWidth === 0 &&
      (parseInt(pos) + ship.length - 1) % board.boardWidth > 0) ||
    (parseInt(pos) % board.boardWidth >
      (parseInt(pos) + ship.length - 1) % board.boardWidth &&
      (parseInt(pos) + ship.length - 1) % board.boardWidth > 0) ||
    noShipAround(parseInt(pos) + ship.length - 1, board)
      ? null
      : parseInt(pos) + ship.length - 1;

  const verticalPos =
    parseInt(pos) + board.boardWidth * (ship.length - 1) > board.length ||
    noShipAround(parseInt(pos) + board.boardWidth * (ship.length - 1), board)
      ? null
      : parseInt(pos) + board.boardWidth * (ship.length - 1);

  return {
    horizontalPos,
    verticalPos,
  };
}

export function removeSecondValidCoordOnBoard(cell, board) {
  const id = cell.id.split("-").slice(1, 2).join("-");
  const placedShips = board.shipLocation;
  const cellsInBoard = board.length;
  for (let i = 1; i <= cellsInBoard; i++) {
    if (!placedShips.has(i)) {
      $(`#m-${id}-${i}`).style.backgroundColor = "";
    }
  }
}

function showValidCoordOnModalBaord(cell, posObj) {
  const validId = cell.id.split("-").slice(0, 2).join("-");
  if (posObj.horizontalPos && cell.dataset.pos !== posObj.horizontalPos) {
    $(`#${validId}-${posObj.horizontalPos}`).style.backgroundColor =
      `rgba(1, 136, 129, 0.1)`;
  }
  if (posObj.verticalPos) {
    $(`#${validId}-${posObj.verticalPos}`).style.backgroundColor =
      `rgba(1, 136, 129, 0.1)`;
  }
}

function highLightShipOnModal(cell, board) {
  const cellId = cell.id.split("-").slice(0, 2).join("-");
  const placedShip = board.shipLocation;
  const locationsIter = placedShip.keys();
  for (const val of locationsIter) {
    $(`#${cellId}-${val}`).classList.add("show-ships");
  }
}

export function registerClickOnModal(player, cell, ship, fleet, shipIndex) {
  // if (ship.start !== null && ship.end !== null) return;
  cell.style.backgroundColor = `#018881`;
  if (ship.length > 1) {
    if (ship.start !== null) {
      ship.setEnd(parseInt(cell.dataset.pos));
      placeAShip(ship, player.gameboard, ship.start, ship.end);
      highLightShip(player);
      highLightShipOnModal(cell, player.gameboard);
      removeSecondValidCoordOnBoard(cell, player.gameboard);
      showSelectedShip(player, selectShipToPlaceOnBoard(fleet, shipIndex));
    } else {
      const possiblePos = shipValidPos(
        cell.dataset.pos,
        ship,
        player.gameboard,
      );
      ship.setStart(cell.dataset.pos);
      showValidCoordOnModalBaord(cell, possiblePos);
    }
  } else {
    ship.setStart(cell.dataset.pos);
    ship.setEnd(cell.dataset.pos);
    placeAShip(ship, player.gameboard, ship.start, ship.end);
    highLightShip(player);
  }
}

export function selectShipToPlaceOnBoard(fleet, index) {
  return fleet[index];
}

export function showSelectedShip(owner, ship) {
  if (!$("#board-heading")) {
    return;
  }
  const ships = $(`#m-${createId(owner.name)}-spc`);

  ships.innerHTML = "";
  for (let i = 0; i < ship.length; i++) {
    const box = cE("div");
    box.classList.add("ship-box");
    $(`#m-${createId(owner.name)}-spc`).appendChild(box);
  }
}

export function showGameStatus(status) {
  $("#gsit").textContent = status;
}

export function manageTurn(player1, player2) {
  if (player1.isTurn) {
    $(`#${player1.name.split(" ").join("")}`).style = `
    background: rgb(0, 0, 0, 0.05);`;
  } else {
    $(`#${player1.name.split(" ").join("")}`).style.background = "none";
  }
  if (player2.isTurn) {
    $(`#${player2.name.split(" ").join("")}`).style.background =
      `rgb(0, 0, 0, 0.05)`;
  } else {
    $(`#${player2.name.split(" ").join("")}`).style.background = "none";
  }
}

function showAttackedLoc(cell, player) {
  if (player.gameboard.shipLocation.has(parseInt(cell.dataset.pos))) {
    cell.style.background = `url(${attackedPNG})`;
  } else {
    cell.style.background = `url(${missed2PNG})`;
  }
  cell.style.backgroundSize = `cover`;
  cell.style.backgroundRepeat = `no-repeat`;
  cell.style.backgroundPosition = `center center`;
}

export function getAttackCoord(cell, player1, player2) {
  if ($("modal-overlay") !== null) return;
  player1.gameboard.receiveAttack(parseInt(cell.dataset.pos));
  showAttackedLoc(cell, player1, player2);
  createFleet();
}
