import { cE } from "./utils/dom-utils";
import { capitalize } from "./utils/string-utils";

export default function modal(fn, player) {
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
  h1.textContent = capitalize(player.name);

  // Ship location setter widget
  const widgetDiv = cE("div");
  widgetDiv.innerHTML = `
    <div class="ships-loc-ctrl-c">
        <select name="ship" id="ship-n">
            <option value="ship-a">Ship A</option>
            <option value="ship-b">Ship B</option>
            <option value="ship-c">Ship C</option>
            <option value="ship-d">Ship D</option>
            <option value="ship-e">Ship E</option>
            <option value="ship-f">Ship F</option>
            <option value="ship-g">Ship G</option>
            <option value="ship-h">Ship H</option>
        </select>
        <button class="place">Place</button>
    </div>
    `;

  // Player board
  const boardCDiv = cE("div");
  boardCDiv.appendChild(fn(player));

  // Done button
  const doneBtn = cE("button");
  doneBtn.id = "done-btn";
  doneBtn.textContent = "Done";
  doneBtn.style = `
        width: 100%;
        font-size: 14px;
        height: 3em;
        border: 1px solid rgb(0, 0, 0, 0.5);
        margin-top: 20px;
        background: none;
    `;

  // cancel button
  const cancelBtn = cE("button");
  cancelBtn.id = "cancel-btn";
  cancelBtn.textContent = "Cancel";
  cancelBtn.style = `
        font-size: 14px;
        width: 100%;
        height: 3em;
        border: 1px solid rgb(0, 0, 0, 0.5);
        border-radius: 4px;
        background-color: #018881;
        color: #fff;
    `;

  cancelBtn.onclick = () => {
    console.log("cancel");
    overlayDiv.remove();
  };

  modalDiv.appendChild(h1);
  modalDiv.appendChild(widgetDiv);
  modalDiv.appendChild(boardCDiv);
  modalDiv.appendChild(doneBtn);
  modalDiv.appendChild(cancelBtn);
  overlayDiv.appendChild(modalDiv);
  return overlayDiv;
}
