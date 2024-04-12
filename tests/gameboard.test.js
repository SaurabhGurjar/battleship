import Gameboard from "../src/gameboard";
import Ship from "../src/ships";

/** 
 * Representation of a gameboard:
`[
   1,  2,  3,  4,  5,  6,  7,  8,

   9, 10, 11, 12, 13, 14, 15, 16,

  17, 18, 19, 20, 21, 22, 23, 24,

  25, 26, 27, 28, 29, 30, 31, 32,

  33, 34, 35, 36, 37, 38, 39, 40,
  
  41, 42, 43, 44, 45, 46, 47, 48,
  
  49, 50, 51, 52, 53, 54, 55, 56,
  
  57, 58, 59, 60, 61, 62, 63, 64,
  ]`
*/

describe("create a gameboard", () => {
  test("create a (10 x 10) gameboard", () => {
    const board = new Gameboard(10, 10);
    expect(board.length).toBe(100);
  });
  test("create a (8 x 10) gameboard", () => {
    const board = new Gameboard(8, 10);
    expect(board.length).toBe(80);
  });

  test("minimum dimension of a board is (7 x 7)", () => {
    expect(() => new Gameboard(8, 5)).toThrow(
      "provide dimensions of at least (7 X 7) to create a board.",
    );
  });

  test("maximum dimension of a board is (10 x 10)", () => {
    expect(() => new Gameboard(10, 11)).toThrow(
      "provide dimensions up to a maximum of (10 X 10) to create a board.",
    );
  });

  test("floating point dimensions", () => {
    expect(() => new Gameboard(8.5, 11)).toThrow(
      "dimensions must be integers.",
    );
  });

  test("infinite dimension", () => {
    expect(() => new Gameboard(Infinity, 11)).toThrow(
      "provide dimensions up to a maximum of (10 X 10) to create a board.",
    );
  });
});

describe("invalid values for dimensions", () => {
  test("no value provided", () => {
    expect(() => new Gameboard()).toThrow("dimensions must be numeric values.");
  });

  test("values are not a number", () => {
    expect(() => new Gameboard("8", "8")).toThrow(
      "dimensions must be numeric values.",
    );
  });

  test("values are not a number", () => {
    expect(() => new Gameboard("8", "8")).toThrow(
      "dimensions must be numeric values.",
    );
  });

  test("values are not a number", () => {
    expect(() => new Gameboard(NaN, "8")).toThrow(
      "dimensions must be numeric values.",
    );
  });

  test("values are not a number", () => {
    expect(() => new Gameboard(null, 8)).toThrow(
      "dimensions must be numeric values.",
    );
  });
});

describe("place ship on board", () => {
  const ship5 = new Ship(5);
  const ship4 = new Ship(4);
  const ship3 = new Ship(3);
  const ship5_2 = new Ship(5);
  const gameBoard = new Gameboard(8, 8);
  const map = new Map();

  test("place ship5", () => {
    [1, 2, 3, 4, 5].forEach((pos) => map.set(pos, ship5));
    gameBoard.placeShipOnBoard(ship5, 1, 5, ship5.length);
    expect(gameBoard.shipsOnBoard).toEqual(map);
  });

  test("place ship4", () => {
    [9, 17, 25, 33].forEach((pos) => map.set(pos, ship4));
    gameBoard.placeShipOnBoard(ship4, 9, 33, ship4.length);
    expect(gameBoard.shipsOnBoard).toEqual(map);
  });

  describe("invalid positions", () => {
    test("Error in placing ship4", () => {
      expect(() =>
        gameBoard.placeShipOnBoard(ship4, 2, 26, ship4.length),
      ).toThrow("a ship is already placed at these positions.");
    });

    test("outside the board", () => {
      expect(() =>
        gameBoard.placeShipOnBoard(ship3, 0, 16, ship3.length),
      ).toThrow("given positions are outside the board.");

      expect(() =>
        gameBoard.placeShipOnBoard(ship3, 63, 65, ship3.length),
      ).toThrow("given positions are outside the board.");

      expect(() =>
        gameBoard.placeShipOnBoard(ship3, 16, 0, ship3.length),
      ).toThrow("end value must be greater than start value.");

      // Throws an error if the ship reaches the next row.
      expect(() =>
        gameBoard.placeShipOnBoard(ship3, 40, 42, ship3.length),
      ).toThrow("ship can't be placed at this location.");

      expect(() =>
        gameBoard.placeShipOnBoard(ship5, 54, 58, ship5.length),
      ).toThrow("ship can't be placed at this location.");
    });
  });

  describe("receive attack", () => {
    test("ship1 hit", () => {
      gameBoard.receiveAttack(1);
      expect(gameBoard.shipsOnBoard.get(1).hits).toEqual(1);
    });

    test("ship1 hit until it sunk", () => {
      gameBoard.receiveAttack(2);
      gameBoard.receiveAttack(3);
      gameBoard.receiveAttack(4);
      gameBoard.receiveAttack(5);
      expect(gameBoard.shipsOnBoard.get(1).isSunk()).toBeTruthy();
    });

    test("ship4 hit until it sunk", () => {
      gameBoard.receiveAttack(9);
      expect(gameBoard.shipsOnBoard.get(9).hits).toEqual(1);

      gameBoard.receiveAttack(17);
      expect(gameBoard.shipsOnBoard.get(17).hits).toEqual(2);

      gameBoard.receiveAttack(25);
      expect(gameBoard.shipsOnBoard.get(25).hits).toEqual(3);

      gameBoard.receiveAttack(33);
      expect(gameBoard.shipsOnBoard.get(33).hits).toEqual(4);
      expect(gameBoard.shipsOnBoard.get(9).isSunk()).toBeTruthy();
      expect(gameBoard.shipsOnBoard.get(33).isSunk()).toBeTruthy();
    });

    test("hit sunked ship", () => {
      expect(() => gameBoard.receiveAttack(9)).toThrow(
        "this ship has already been sunked.",
      );
      expect(() => gameBoard.receiveAttack(25)).toThrow(
        "this ship has already been sunked.",
      );
    });

    test("invalid input", () => {
      expect(() => gameBoard.receiveAttack()).toThrow(
        "'undefined' is not a number.",
      );
      expect(() => gameBoard.receiveAttack("9")).toThrow(
        "'9' is not a number.",
      );
      expect(() => gameBoard.receiveAttack(8.5)).toThrow(
        "8.5 is not a valid coordinate.",
      );
    });

    test("missed attack", () => {
      gameBoard.receiveAttack(8);
      gameBoard.receiveAttack(21);
      gameBoard.receiveAttack(11);
      gameBoard.receiveAttack(15);

      expect(gameBoard.missed.has(8)).toBeTruthy();
      expect(gameBoard.missed.has(21)).toBeTruthy();
      expect(gameBoard.missed.has(11)).toBeTruthy();
      expect(gameBoard.missed.has(15)).toBeTruthy();
    });

    describe("all ships have been sunked", () => {
      test("ships sunked", () => {
        expect(gameBoard.allShipSunk()).toBeTruthy();
      });
    });
  });
});
