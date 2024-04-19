import { placeFleet } from "./game";
import { cE } from "./utils/dom-utils";
import { randomlyPlaceFleet } from "./utils/game-utils";
import { capitalize, createId } from "./utils/string-utils";
import {
  highLightShip,
  highLightShipOnModal,
  resetBoardUI,
  resetModalBoard,
} from "./utils/ui-utils";
import { $ } from "./utils/dom-utils";

export default function modal(id, owner, other, shipIndex, fleet, createBoard) {
  const overlayDiv = cE("div");
  overlayDiv.id = "modal-overlay";
  overlayDiv.style = `
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgb(1, 136, 129, 0.2);
        @media only screen and (min-width: 600px) { 
            .cell {
              width: 5em;
              height: 5em;
            }
            .board-c {
              gap: 8em;
            }
            #model {
                padding: 0;
            }
          }

    `;

  // Modal
  const modalDiv = cE("div");
  modalDiv.id = "modal";
  modalDiv.style = `
        position: sticky;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #000;
        top: 15%;
        gap: 10px;
        background-color: #fff;

    `;

  // Modal header
  const h1 = cE("h1");
  h1.id = "board-heading";
  h1.textContent = `${capitalize(owner.name)}'s board`;
  const displayDiv = cE("div");
  displayDiv.classList.add("selected-ship-display-container");
  const text = cE("span");
  text.textContent = "Ship";
  displayDiv.append(text);

  const shipContainer = cE("div");
  shipContainer.id = `m-${createId(owner.name)}-spc`;
  shipContainer.classList.add("modal-ship-container");
  displayDiv.appendChild(shipContainer);

  // Player board
  const boardCDiv = cE("div");
  boardCDiv.appendChild(createBoard(id, owner, other, shipIndex, fleet));

  // Button container
  const btnContDiv = cE("div");
  btnContDiv.style = `
     display: flex;
     flex: 1 1 auto;
     padding: .5em;
     justify-content: center;
     align-items: center;
     gap: 1em;
     width: 100%;
  `;
  const btnStyle = `
  width: 100%;
  font-size: 14px;
  height: 3em;
  border: 1px solid rgb(0, 0, 0, 0.5);
  border-radius: 4px;
  `;
  // Randomize button
  const randomizeBtn = cE("button");
  randomizeBtn.id = "random-btn";
  randomizeBtn.textContent = "Randomize";
  randomizeBtn.style = `
    ${btnStyle}
    background-color: #97b6bc;
  `;

  // Done button
  const doneBtn = cE("button");
  doneBtn.id = "done-btn";
  doneBtn.textContent = "Done";
  doneBtn.disabled = "true";
  doneBtn.style = `
    ${btnStyle}
    background: none;
  `;

  // cancel button
  const cancelBtn = cE("button");
  cancelBtn.id = "cancel-btn";
  cancelBtn.textContent = "Cancel";
  cancelBtn.style = `
    ${btnStyle}
    background-color: #018881;
    color: #fff;
  `;

  doneBtn.onclick = () => {
    overlayDiv.remove();
    highLightShip(owner);
  };

  randomizeBtn.onclick = () => {
    resetModalBoard(owner);
    owner.gameboard.shipLocation.clear();
    placeFleet(owner, randomlyPlaceFleet());
    highLightShipOnModal(owner);
    const doneBtn = $("#done-btn");
    const cancelBtn = $("#cancel-btn");
    doneBtn.disabled = false;
    doneBtn.style.backgroundColor = "#018881";
    doneBtn.style.color = "#fff";
    cancelBtn.style.backgroundColor = "";
    cancelBtn.style.color = "#000";
  };

  cancelBtn.onclick = () => {
    const board = owner.gameboard;
    board.shipLocation.clear();
    resetBoardUI(owner);
    overlayDiv.remove();
  };

  modalDiv.appendChild(h1);
  modalDiv.appendChild(displayDiv);
  modalDiv.appendChild(boardCDiv);
  btnContDiv.appendChild(cancelBtn);
  btnContDiv.appendChild(randomizeBtn);
  btnContDiv.appendChild(doneBtn);
  modalDiv.appendChild(btnContDiv);
  overlayDiv.appendChild(modalDiv);
  return overlayDiv;
}
