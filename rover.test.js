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

      describe("and no instructions", () => {
        it(`should return the starting state ${state} unchanged`, () => {
          expect(rover(`${world}\n${state}`)).toEqual(state);
        });
      });

      describe("and a right rotation instruction", () => {
        const instruction = "R";
        const expectedOrientation = {
          N: "E",
          E: "S",
          S: "W",
          W: "N",
        }[orientation];

        it(`should return the starting location with an updated orientation (${expectedOrientation})`, () => {
          expect(rover(`${world}\n${state}\n${instruction}`)).toEqual(
            `${location} ${expectedOrientation}`
          );
        });
      });

      describe("and a left rotation instruction", () => {
        const instruction = "L";
        const expectedOrientation = {
          N: "W",
          E: "N",
          S: "E",
          W: "S",
        }[orientation];

        it(`should return the starting location with an updated orientation (${expectedOrientation})`, () => {
          expect(rover(`${world}\n${state}\n${instruction}`)).toEqual(
            `${location} ${expectedOrientation}`
          );
        });
      });
    });
  });
});
