import Gameboard from "./gameboard";
export default class Player {
  constructor(name, gameBoard, turn = false) {
    if (typeof name !== "string") {
      throw new TypeError("name must be a string.");
    }
    if (!(gameBoard instanceof Gameboard)) {
      throw new Error("gameboard must be an instances of Gameboard.");
    }
    this.name = name;
    this._turn = turn;
    this.gameboard = gameBoard;
  }

  toggleTurn() {
    this._turn = this._turn ? false : true;
  }

  get isTurn() {
    return this._turn;
  }

  get board() {
    return this.gameboard;
  }
}
