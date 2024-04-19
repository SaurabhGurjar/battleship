import Player from "../src/player";
import Gameboard from "../src/gameboard";

describe("create a new player", () => {
  const p1 = new Player("p1", new Gameboard(8, 8));
  const p2 = new Player("p2", new Gameboard(8, 8));

  const player1 = {
    name: "p1",
    _turn: false,
    gameboard: new Gameboard(8, 8),
  };

  const player2 = {
    name: "p2",
    _turn: false,
    gameboard: new Gameboard(8, 8),
  };
  test("player 1", () => {
    expect(p1).toEqual(player1);
  });

  test("player 2", () => {
    expect(p2).toEqual(player2);
  });

  test("player1's turn to shot", () => {
    p1._turn = true;
    expect(p1._turn).toBeTruthy();
  });
  test("player2's turn to shot", () => {
    p2._turn = true;
    p1._turn = false;
    expect(p1._turn).toBeFalsy();
    expect(p2._turn).toBeTruthy();
  });

  test("get gameboard of player 1", () => {
    expect(p1.gameboard).toEqual(player1.gameboard);
  });

  describe("invalid input values", () => {
    test("name is type of number", () => {
      expect(() => new Player(2, new Gameboard(8, 8))).toThrow(
        "name must be a string.",
      );
    });
    test("gameboard must be an instanceof Gameboard", () => {
      expect(
        () =>
          new Player("p2", {
            boardWidth: 8,
            boardheight: 8,
            missed: new Set(),
            shipsOnBoard: new Map(),
          }),
      ).toThrow("gameboard must be an instances of Gameboard.");
    });
  });
});
