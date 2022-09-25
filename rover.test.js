describe("Mars Rover", () => {
  let rover;

  beforeAll(async () => {
    ({ default: rover } = await import("./rover.js"));
  });

  it("should export a function as a default export", () => {
    expect(rover).toBeInstanceOf(Function);
  });

  describe("given a single robot, a minimum viable world (single unit size), a valid start location (0 0)", () => {
    const origin = "0 0";
    const world = `${origin}`;
    const location = `${origin}`;

    describe.each`
      orientation
      ${"N"}
      ${"E"}
      ${"S"}
      ${"W"}
    `("and orientation cardinal ($orientation)", ({ orientation }) => {
      const state = `${location} ${orientation}`;

      it("should return the starting state unchanged", () => {
        expect(rover(`${world}\n${state}`)).toEqual(state);
      });
    });

    describe("and orientation cardinal (N), and a right rotation instruction", () => {
      const orientation = "N";
      const state = `${location} ${orientation}`;
      const instruction = "R";

      it(`should return the location with an updated orientation (E)`, () => {
        expect(rover(`${world}\n${state}\n${instruction}`)).toEqual(
          `${location} E`
        );
      });
    });

    describe("and orientation cardinal (E), and a right rotation instruction", () => {
      const orientation = "E";
      const state = `${location} ${orientation}`;
      const instruction = "R";

      it(`should return the location with an updated orientation (S)`, () => {
        expect(rover(`${world}\n${state}\n${instruction}`)).toEqual(
          `${location} S`
        );
      });
    });
  });
});
