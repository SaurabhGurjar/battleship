import Player from "./player";
import Gameboard from "./gameboard";
import createUI from "./createUI";
import {
  getAttackCoord,
  manageTurn,
  showGameStatus,
} from "./utils/ui-utils";
import { capitalize } from "./utils/string-utils";
import { randomlyPlaceFleet } from "./utils/game-utils";

export function placeFleet(player, fleet) {
  fleet.forEach((ship) => {
    player.board.placeShipOnBoard(ship, ship.start, ship.end, ship.length);
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

export function gameLoop(cell, attacker, receiver) {
  let gameStatus = "";
  if (cell) {
    attack(cell, attacker, receiver);
    if (isGameOver(attacker, receiver)) {
      gameStatus = `${capitalize(winner(attacker, receiver).name)} sank the 
        ${capitalize(
          attacker.board.allShipSunk() ? attacker.name : receiver.name,
        )}'s fleet.`;
      showGameStatus(gameStatus);
      return;
    }
    if (!attacker.board.shipLocation.has(parseInt(cell.dataset.pos))) {
      switchTurn(attacker, receiver);
      manageTurn(attacker, receiver);
    }
    gameStatus = capitalize(
      `${attacker.isTurn ? attacker.name : receiver.name} attack`,
    );
    showGameStatus(gameStatus);
  }
}

export default function game() {
  const p1 = new Player("player 1", new Gameboard(10, 10), true);
  const p2 = new Player("player 2", new Gameboard(10, 10));

  placeFleet(p2, randomlyPlaceFleet());
  createUI(p1, p2);
  manageTurn(p1, p2);
  gameLoop(null, p1, p2);
  showGameStatus(capitalize(`${p1.name} attack`));
}
