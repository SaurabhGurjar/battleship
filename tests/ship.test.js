import Ship from "../src/ships";

describe("create a ship", () => {
  const ship1 = {
    start: null,
    end: null,
    length: 1,
    hits: 0,
  };
  const ship4 = {
    start: null,
    end: null,
    length: 4,
    hits: 0,
  };
  test("ship of length -1", () => {
    expect(() => new Ship(-1)).toThrow(
      `ship's length must be less than or equal to ${Ship.SHIP_MAX_LENGTH} and greater than 0.`,
    );
  });
  test("ship of length one", () => {
    expect(new Ship(1)).toEqual(ship1);
  });
  test("ship of length five", () => {
    expect(new Ship(4)).toEqual(ship4);
  });
  test("ship of length six", () => {
    expect(() => new Ship(6)).toThrow(
      `ship's length must be less than or equal to ${Ship.SHIP_MAX_LENGTH} and greater than 0.`,
    );
  });
  test("ship of length zero", () => {
    expect(() => new Ship(0)).toThrow(
      `ship's length must be less than or equal to ${Ship.SHIP_MAX_LENGTH} and greater than 0.`,
    );
  });
  describe("invalid length value", () => {
    test("'1'", () => {
      expect(() => new Ship("1")).toThrow(
        "'1' is not a valid for ship length, The arg must be a number.",
      );
    });
    test("NaN", () => {
      expect(() => new Ship(NaN)).toThrow(
        "'NaN' is not a valid for ship length, The arg must be a number.",
      );
    });
    test("undefined", () => {
      expect(() => new Ship()).toThrow("the length of the ship is undefined.");
    });
    test("null", () => {
      expect(() => new Ship(null)).toThrow(
        "'null' is not a valid for ship length, The arg must be a number.",
      );
    });
    test("true", () => {
      expect(() => new Ship(true)).toThrow(
        "'true' is not a valid for ship length, The arg must be a number.",
      );
    });
  });
});

describe("hit the ship", () => {
  let ship;
  // Use beforeEach hook to intailize the ship before each test
  beforeEach(() => {
    ship = new Ship(3);
  });
  // const ship = new Ship(3);
  test("hit a ship until it sunk", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
    expect(ship.isSunk()).toBeFalsy();
    ship.hit();
    expect(ship.hits).toBe(2);
    expect(ship.isSunk()).toBeFalsy();
    ship.hit();
    expect(ship.hits).toBe(3);
    expect(ship.isSunk()).toBeTruthy();
  });
  test("hit a ship beyond its length", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(3);
    expect(ship.isSunk()).toBeTruthy();
  });
});
