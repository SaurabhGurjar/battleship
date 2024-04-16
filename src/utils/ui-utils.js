import attackedPNG from "../static/assets/cracked-glass.png";
import missed2PNG from "../static/assets/missed2.png";

import { $ } from "./dom-utils";

export function highLightShip(player) {
  const playerId = player.name.split(" ").join("");
  const locationsIter = player.gameboard.shipLocation.keys();
  for (const val of locationsIter) {
    $(`#${playerId}-${val}`).classList.add("show-ships");
  }
}

export function manageTurn(player1, player2) {
  console.log(player1.name, player1.isTurn, player2.name, player2.isTurn);
  if (player1.isTurn) {
    $(`#${player1.name.split(" ").join("")}`).style.background =
      `rgb(0, 0, 0, 0.05)`;
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
}
