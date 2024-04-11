export default class Gameboard {
  static BOARD_MINIMUM_DIMENSION = 47;
  static BOARD_MAXIMUM_DIMENSION = 100;
  constructor(width, height) {
    if (
      typeof width !== "number" ||
      typeof height !== "number" ||
      isNaN(width) ||
      isNaN(height)
    ) {
      throw new Error("dimensions must be numeric values.");
    }
    if (width * height < Gameboard.BOARD_MINIMUM_DIMENSION) {
      throw new Error(
        "provide dimensions of at least (7 X 7) to create a board.",
      );
    }
    if (width * height > Gameboard.BOARD_MAXIMUM_DIMENSION) {
      throw new Error(
        "provide dimensions up to a maximum of (10 X 10) to create a board.",
      );
    }
    if (!Number.isInteger(width) || !Number.isInteger(height)) {
      throw new Error("dimensions must be integers.");
    }
    this.shipsOnBoard = new Map();
    this.boardWidth = width;
    this.boardheight = height;
  }

  get length() {
    return this.boardWidth * this.boardheight;
  }

  _shipPosition(start, end, shipLength) {
    const position = [];
    const coordDiff =
      shipLength > 1 ? Math.floor((end - start) / (shipLength - 1)) : 1;
    for (let i = start; i <= end; i += coordDiff) {
      position.push(i);
    }
    return position;
  }

  placeShipOnBoard(shipName, start, end, shipLength) {
    if (start > end) {
      throw new Error("end value must be greater than start value.");
    }
    if (start < 1 || start > this.length || end < 1 || end > this.length) {
      throw new Error("given coordinates are outside the board.");
    }
    const coords = this._shipPosition(start, end, shipLength);

    // Check if the a ship is already placed at these coordinates.
    coords.forEach((pos) => {
      if (this.shipsOnBoard.has(pos)) {
        throw new Error("a ship is already placed at these coordinates.");
      }
    });

    coords.forEach((pos) => {
      this.shipsOnBoard.set(pos, shipName);
    });
  }
}
