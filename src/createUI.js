const root = document.querySelector("#root");

function createPlayerBoard(player) {
  const boardUI = document.createElement("div");
  boardUI.id = player.name;
  boardUI.classList.add("board");
  for (let row = 1; row <= player.board.boardWidth; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.id = `r-${row}`;
    rowDiv.classList.add("row");

    for (let col = 1; col <= player.board.boardheight; col++) {
      const colDiv = document.createElement("div");
      colDiv.id = `c-${col}`;
      colDiv.classList.add("col");
      colDiv.textContent = `${row}-${col}`;
      rowDiv.appendChild(colDiv);
    }
    boardUI.appendChild(rowDiv);
  }
  return boardUI;
}

export default function createUI(player) {
  console.log(player.board);
  root.appendChild(createPlayerBoard(player));
}
