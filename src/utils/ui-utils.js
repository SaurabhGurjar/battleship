import attackedPNG from "../static/assets/cracked-glass.png";
import missed2PNG from "../static/assets/missed2.png";

import { $ } from "./dom-utils";

export function getShipCoords(cell) {
    return cell.textContent;
}

function disableAttackLoc(cell, player) {
    if(player.gameboard.shipLocation.has(parseInt(cell.dataset.pos))) {
        cell.style.background = `url(${attackedPNG})`;
    } else {
        cell.style.background = `url(${missed2PNG})`;
        
    }
    cell.style.backgroundSize = `cover`;
    cell.style.backgroundRepeat = `no-repeat`;
    cell.style.backgroundPosition = `center center`;
}

export function getAttackCoord(cell, player) {
    if($("modal-overlay") !== null) return;
    player.gameboard.receiveAttack(Number(cell.dataset.pos));
    disableAttackLoc(cell, player);
    console.log(player.name, player.gameboard);
}
