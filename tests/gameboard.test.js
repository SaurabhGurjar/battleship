import Gameboard from "../src/gameboard";
import Ship from "../src/ships";

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

  describe("invalid coordinates", () => {
    test("Error in placing ship4", () => {
      expect(() =>
        gameBoard.placeShipOnBoard(ship4, 2, 26, ship4.length),
      ).toThrow("a ship is already placed at these coordinates.");
    });

    test("outside the board", () => {
      expect(() =>
        gameBoard.placeShipOnBoard(ship3, 0, 16, ship3.length),
      ).toThrow("given coordinates are outside the board.");

      expect(() =>
        gameBoard.placeShipOnBoard(ship3, 63, 65, ship3.length),
      ).toThrow("given coordinates are outside the board.");

      expect(() =>
        gameBoard.placeShipOnBoard(ship3, 16, 0, ship3.length),
      ).toThrow("end value must be greater than start value.");
    });
  });

  describe("receive attack", () => {
    test("ship1 hit", () => {
      gameBoard.receiveAttack(1);
      expect(gameBoard.shipsOnBoard.get(1).hits).toEqual(1);
    });

    test("ship4 hit until sunk", () => {
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
  });
});
