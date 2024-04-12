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
    this.shotsHit = new Set();
    this.shotsMissed = new Set();
    this.boardWidth = width;
    this.boardheight = height;
  }

  get length() {
    return this.boardWidth * this.boardheight;
  }

  get shipLocation() {
    return this.shipsOnBoard;
  }

  get hits() {
    return this.shotsHit;
  }

  get missed() {
    return this.shotsMissed;
  }

  get width() {
    return this.boardWidth;
  }

  get height() {
    return this.boardheight;
  }

  _shipPosition(start, end, shipLength) {
    const position = [];

    /** Finding difference between start and end positions to determine
     * if the ship is place verticaly or horzontally.
     */
    const coordDiff =
      shipLength > 1 ? Math.floor((end - start) / (shipLength - 1)) : 1;

    for (let i = start; i <= end; i += coordDiff) {
      position.push(i);
    }

    return position;
  }

  placeShipOnBoard(shipName, start, end, shipLength) {
    if (start > end) {
      throw new Error(
        `end(${end}) value must be greater than start(${start}) value.`,
      );
    }
    if (start < 1 || start > this.length || end < 1 || end > this.length) {
      throw new Error(
        `given coordinates(${start}, ${end}) are outside the board.`,
      );
    }

    // Check if the ship reaches the next row of the gameboard.
    if (
      start % this.boardWidth > end % this.boardWidth ||
      (start % this.boardWidth === 0 && end % this.boardWidth > 0)
    ) {
      throw new Error(
        `ship can't be placed at this location(${start}, ${end}).`,
      );
    }
    const coords = this._shipPosition(start, end, shipLength);

    // Check if the a ship is already placed at these positions.
    coords.forEach((pos) => {
      if (this.shipsOnBoard.has(pos)) {
        throw new Error(
          `a ship is already placed at these coordinates(${start}, ${end}).`,
        );
      }
    });

    coords.forEach((pos) => {
      this.shipsOnBoard.set(pos, shipName);
    });
  }

  receiveAttack(coord) {
    if (typeof coord !== "number" || isNaN(coord)) {
      throw new TypeError(`'${coord}' is not a number.`);
    }
    if (!Number.isInteger(coord)) {
      throw new TypeError(`${coord} is not a valid coordinate.`);
    }
    if (this.shipsOnBoard.has(coord)) {
      if (!this.shipsOnBoard.get(coord).isSunk() && !this.shotsHit.has(coord)) {
        this.shipsOnBoard.get(coord).hit();
        this.shotsHit.add(coord);
      }
    } else {
      this.shotsMissed.add(coord);
    }
  }

  allShipSunk() {
    const ships = Array.from(new Set(Array.from(this.shipsOnBoard.values())));
    return ships.every((ship) => ship.isSunk());
  }
}
