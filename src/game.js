import Ship from "./ships";
import Player from "./player";
import Gameboard from "./gameboard";
import createUI from "./createUI";
import { getAttackCoord, manageTurn } from "./utils/ui-utils";

const shipCoordsAndLen = [
  {
    start: 9,
    end: 41,
    shipLen: 5,
  },
  {
    start: 23,
    end: 47,
    shipLen: 4,
  },
  {
    start: 4,
    end: 28,
    shipLen: 3,
  },
  {
    start: 12,
    end: 13,
    shipLen: 2,
  },
  {
    start: 29,
    end: 29,
    shipLen: 1,
  },
  {
    start: 53,
    end: 53,
    shipLen: 1,
  },
  {
    start: 59,
    end: 59,
    shipLen: 1,
  },
  {
    start: 3,
    end: 3,
    shipLen: 1,
  },
];

function placeShips(player, shipsArr) {
  shipsArr.forEach((ship) => {
    player.board.placeShipOnBoard(
      new Ship(ship.shipLen),
      ship.start,
      ship.end,
      ship.shipLen,
    );
  });
}

function isGameOver(player1, player2) {
  if (player1.board.allShipSunk()) {
    return true;
  }

  if (player2.board.allShipSunk()) {
    return true;
  }

  return false;
}

function winner(player1, player2) {
  if (player1.board.allShipSunk()) {
    return player2;
  } else {
    return player1;
  }
}

function switchTurn(player1, player2) {
  player1.toggleTurn();
  player2.toggleTurn();
}

function attack(cell, player1, player2) {
  getAttackCoord(cell, player1, player2);
}

export function gameLoop(cell, player1, player2) {
  if (cell) {
    attack(cell, player1, player2);
    if (isGameOver(player1, player2)) {
      console.log(winner(player1, player2).name);
      return;
    }
    const player = player1.isTurn ? player1 : player2;
    if (!player.board.shipLocation.has(parseInt(cell.dataset.pos))) {
      switchTurn(player1, player2);
    }
    manageTurn(player1, player2);
  }
}

export default function game() {
  const p1 = new Player("player 1", new Gameboard(8, 8), true);
  const p2 = new Player("player 2", new Gameboard(8, 8));

  placeShips(p1, shipCoordsAndLen);
  placeShips(p2, shipCoordsAndLen);
  createUI(p1, p2);
  manageTurn(p1, p2);
  gameLoop(null, p1, p2);
}
