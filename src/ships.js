export default class Ship {
  // Maximum allowed length for a ship
  static SHIP_MAX_LENGTH = 6;

  // Constructs a ship object
  constructor(length) {
    // Invalid value check
    if (length === undefined) {
      throw new Error("the length of the ship is undefined.");
    }
    if (typeof length !== "number" || isNaN(length)) {
      throw new TypeError(
        `'${length}' is not a valid for ship length, The arg must be a number.`,
      );
    }

    if (length >= Ship.SHIP_MAX_LENGTH || length <= 0) {
      throw new Error(
        `the ship's length must be less than ${Ship.SHIP_MAX_LENGTH} and greater than 0.`,
      );
    }

    this.length = length;
    this.hits = 0;
  }

  hit() {
    if (this.hits < this.length) {
      this.hits += 1;
    }
  }

  isSunk() {
    return this.hits === this.length;
  }
}