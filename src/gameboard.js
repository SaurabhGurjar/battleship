export default class Gameboard {
    static BOARD_MINIMUM_DIMENSION = 47;
    static BOARD_MAXIMUM_DIMENSION = 100;
    constructor(width, height) {
        if(typeof width !== "number" || typeof height !== "number" || isNaN(width) || isNaN(height)) {
            throw new Error("dimensions must be numeric values.");
        }
        if(width * height <  Gameboard.BOARD_MINIMUM_DIMENSION) {
            throw new Error("provide dimensions of at least (7 X 7) to create a board.");
        }
        if(width * height > Gameboard.BOARD_MAXIMUM_DIMENSION) {
            throw new Error("provide dimensions up to a maximum of (10 X 10) to create a board.")
        }
        if(!Number.isInteger(width) || !Number.isInteger(height)) {
            throw new Error("dimensions must be integers.");
        }
        this.board = [];
        this.boardWidth = width;
        this.boardheight = height;
    }

    get length() {
        return this.boardWidth * this.boardheight;
    }
}