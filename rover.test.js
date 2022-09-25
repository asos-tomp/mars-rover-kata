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

    describe("and a forward instruction", () => {
      const instruction = "F";

      describe.each`
        world    | location | orientation | expectedLocation
        ${"0 1"} | ${"0 0"} | ${"N"}      | ${"0 1"}
        ${"0 1"} | ${"0 1"} | ${"S"}      | ${"0 0"}
        ${"1 0"} | ${"0 0"} | ${"E"}      | ${"1 0"}
        ${"1 0"} | ${"1 0"} | ${"W"}      | ${"0 0"}
        ${"0 2"} | ${"0 2"} | ${"S"}      | ${"0 1"}
        ${"3 0"} | ${"3 0"} | ${"W"}      | ${"2 0"}
      `(
        "and a world with dimensions ($world), a valid start location ($location) and orientation cardinal ($orientation)",
        ({ world, location, orientation, expectedLocation }) => {
          const state = `${location} ${orientation}`;

          it(`should return a new state (${expectedLocation} ${orientation}) and no indication that the robot is lost`, () => {
            expect(rover(`${world}\n${state}\n${instruction}`)).toEqual(
              `${expectedLocation} ${orientation}`
            );
          });
        }
      );
    });

    describe("and a world with dimensions (5 3)", () => {
      const world = "5 3";

      describe.each`
        state      | instructions       | expectation
        ${"1 1 E"} | ${"RFRFRFRF"}      | ${"1 1 E"}
        ${"3 2 N"} | ${"FRRFLLFFRRFLL"} | ${"3 3 N LOST"}
      `(
        "and a valid start state ($state) and instructions ($instructions)",
        ({ state, instructions, expectation }) => {
          it(`should return a new state (${expectation})`, () => {
            expect(rover(`${world}\n${state}\n${instructions}`)).toEqual(
              expectation
            );
          });
        }
      );
    });
  });
});
