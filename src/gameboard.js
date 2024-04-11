export default class Gameboard {
    constructor(width, length) {
        this.board = [];
        this.boardWidth = width;
        this.boardLength = length;
    }

    get length() {
        return this.boardWidth * this.boardLength;
    }
}