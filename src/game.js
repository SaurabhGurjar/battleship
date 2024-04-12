import Ship from "./ships";
import Player from "./player";
import Gameboard from "./gameboard";
import createUI from "./createUI";

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
    console.log(player1.board.allShipSunk());
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
  if (player1.isTurn) {
    player1.turn = false;
    player2.turn = true;
  } else {
    player1.turn = true;
    player2.turn = false;
  }
}

function attack(attackCoord, player) {
  console.log(attackCoord, player.board);
  player.board.receiveAttack(attackCoord);
}

function gameLoop(userInput, player1, player2) {
  if (isGameOver(player1, player2)) {
    console.log(userInput);
    return winner(player1, player2);
  } else {
    const player = player1.isTurn ? player1 : player2;
    console.log(player);
    attack(userInput, player);
    switchTurn(player1, player2);
  }
}

export default function game() {
  const p1 = new Player("player 1", new Gameboard(8, 8));
  const p2 = new Player("player 2", new Gameboard(8, 8));
  p1.turn = true;

  placeShips(p1, shipCoordsAndLen);
  placeShips(p2, shipCoordsAndLen);
  gameLoop(16, p1, p2);
  p1.board.receiveAttack(16);
  createUI(p1);
  createUI(p2);
}
