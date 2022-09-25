describe("Mars Rover", () => {
  let rover;

  beforeAll(async () => {
    ({ default: rover } = await import("./rover.js"));
  });

  it("should export a function as a default export", () => {
    expect(rover).toBeInstanceOf(Function);
  });

  describe("given a single robot ", () => {
    const origin = "0 0";

    describe("with a valid start location (0 0) and a minimum viable world (single unit size)", () => {
      const location = `${origin}`;
      const world = `${origin}`;

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

        describe.each`
          instruction | orientationMap
          ${"R"}      | ${{ N: "E", E: "S", S: "W", W: "N" }}
          ${"L"}      | ${{ N: "W", E: "N", S: "E", W: "S" }}
        `(
          "and rotation instruction ($instruction)",
          ({ instruction, orientationMap }) => {
            const expectedOrientation = orientationMap[orientation];

            it(`should return the starting location with an updated orientation (${expectedOrientation})`, () => {
              expect(rover(`${world}\n${state}\n${instruction}`)).toEqual(
                `${location} ${expectedOrientation}`
              );
            });
          }
        );

        describe.each`
          instructions
          ${"R"}
          ${"L"}
          ${"RR"}
          ${"LL"}
          ${"RRR"}
          ${"LLL"}
          ${"LR"}
          ${"RL"}
          ${"RLR"}
        `("and instructions $instructions", ({ instructions }) => {
          const cardinals = ["N", "E", "S", "W"];
          let orientationIndex = cardinals.indexOf(orientation);

          instructions.split("").forEach((instruction) => {
            const instructionDeltaMap = {
              L: -1,
              R: 1,
            };
            const modulo = (n, m) => ((n % m) + m) % m;
            orientationIndex = modulo(
              orientationIndex + instructionDeltaMap[instruction],
              4
            );
          });

          const expectedOrientation = cardinals[orientationIndex];
          it(`should return the starting location with an updated orientation (${expectedOrientation})`, () => {
            expect(rover(`${world}\n${state}\n${instructions}`)).toEqual(
              `${location} ${expectedOrientation}`
            );
          });
        });

        describe("and a forward instruction (F)", () => {
          const instruction = "F";

          it(`should return the starting location with an indication that the robot is lost`, () => {
            expect(rover(`${world}\n${state}\n${instruction}`)).toEqual(
              `${state} LOST`
            );
          });
        });
      });
    });

    describe("and a world with two units height and one width and a forward instruction", () => {
      const world = "0 1";

      describe("and a valid start location (0 0) orientation cardinal (N)", () => {
        const orientation = "N";
        const location = "0 0";
        const state = `${location} ${orientation}`;
        const expectedLocation = "0 1";
        const instruction = "F";

        it(`should return a new state (${expectedLocation} ${orientation}) and no indication that the robot is lost`, () => {
          expect(rover(`${world}\n${state}\n${instruction}`)).toEqual(
            `${expectedLocation} ${orientation}`
          );
        });
      });

      describe("and a valid start location (0 1) orientation cardinal (S)", () => {
        const orientation = "S";
        const location = "0 1";
        const state = `${location} ${orientation}`;
        const expectedLocation = "0 0";
        const instruction = "F";

        it(`should return a new state (${expectedLocation} ${orientation}) and no indication that the robot is lost`, () => {
          expect(rover(`${world}\n${state}\n${instruction}`)).toEqual(
            `${expectedLocation} ${orientation}`
          );
        });
      });
    });
  });
});
