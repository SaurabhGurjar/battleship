import Gameboard from "./gameboard";
export default class Player {
  constructor(name, gameBoard) {
    if (typeof name !== "string") {
      throw new TypeError("name must be a string.");
    }
    if (!(gameBoard instanceof Gameboard)) {
      throw new Error("gameboard must be an instances of Gameboard.");
    }
    this.name = name;
    this._turn = false;
    this.gameboard = gameBoard;
  }

  set turn(bool) {
    this._turn = bool;
  }

  get isTurn() {
    return this._turn;
  }

  get board() {
    return this.gameboard;
  }
}
