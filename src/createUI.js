const p1Name = document.querySelector("#p1-name");
const p2Name = document.querySelector("#p2-name");
const p1BoardC = document.querySelector("#p1-c");
const p2BoardC = document.querySelector("#p2-c");

function createPlayerBoard(player) {
  let count = 1;
  const boardUI = document.createElement("div");
  boardUI.id = player.name.split(" ").join("-");
  boardUI.classList.add("board");
  for (let row = 1; row <= player.board.boardWidth; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.id = `r-${row}`;
    rowDiv.classList.add("row");

    for (let col = 1; col <= player.board.boardheight; col++) {
      const colDiv = document.createElement("div");
      colDiv.id = `c-${col}`;
      colDiv.classList.add("col");
      colDiv.textContent = count;
      count++;
      rowDiv.appendChild(colDiv);
    }
    boardUI.appendChild(rowDiv);
  }
  return boardUI;
}

export default function createUI(player1, player2) {
  p1Name.textContent = player1.name;
  p2Name.textContent = player2.name;
  p1BoardC.appendChild(createPlayerBoard(player1));
  p2BoardC.appendChild(createPlayerBoard(player2));
}
