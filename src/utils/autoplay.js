import { $ } from "./dom-utils";
import { createId } from "./string-utils";

function generateAttackCoord(board) {
  return Math.floor(Math.random() * (board.length - 1) + 1);
}

export function autoplay(boardOwner, otherPlayer) {
  const coord = generateAttackCoord(otherPlayer.gameboard);
  const cell = $(`#${createId(otherPlayer.name)}-${coord}`);
  // If the coord has already been played, get new coord.
  if (
    otherPlayer.gameboard.missed.has(coord) ||
    otherPlayer.gameboard.hit.has(coord)
  ) {
    autoplay(boardOwner, otherPlayer);
  } else {
    if (otherPlayer.name !== "player 2") {
      setTimeout(() => cell.click(), 1500);
      // If a ship get hit play again
      if (otherPlayer.gameboard.shipLocation.has(coord)) {
        setTimeout(() => autoplay(boardOwner, otherPlayer), 1000);
      }
    }
  }
}
