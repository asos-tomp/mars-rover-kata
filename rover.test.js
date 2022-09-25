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

    describe("and a valid world size", () => {
      describe("of minimum viable dimension (single unit size)", () => {
        const world = `${origin}`;

        describe("with a valid start location (0 0)", () => {
          const location = `${origin}`;

          describe.each`
            orientation
            ${"N"}
            ${"E"}
            ${"S"}
            ${"W"}
          `("and orientation cardinal ($orientation)", ({ orientation }) => {
            const state = `${location} ${orientation}`;

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
      });

      describe.each`
        right | top
        ${50} | ${0}
        ${0}  | ${50}
      `("of right top coordinate ($right $top)", ({ right, top }) => {
        const world = `${right} ${top}`;

        describe.each`
          location
          ${"0 0"}
          ${`${right} 0`}
          ${`0 ${top}`}
        `("with a valid start location ($location)", ({ location }) => {
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
            `(
              "and rotation instructions ($instructions)",
              ({ instructions }) => {
                const cardinals = ["N", "E", "S", "W"];
                let orientationIndex = cardinals.indexOf(orientation);

                instructions.split("").forEach((instruction) => {
                  const instructionDeltaMap = {
                    L: -1,
                    R: 1,
                  };
                  const mod = (n, m) => ((n % m) + m) % m;
                  orientationIndex = mod(
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
              }
            );
          });
        });
      });

      describe.each`
        right | top   | valid
        ${51} | ${0}  | ${"an invalid"}
        ${50} | ${0}  | ${"a valid"}
        ${-1} | ${0}  | ${"an invalid"}
        ${0}  | ${51} | ${"an invalid"}
        ${0}  | ${50} | ${"a valid"}
        ${0}  | ${-1} | ${"an invalid"}
      `(
        "and $valid world right top coordinate ($right $top)",
        ({ right, top, valid }) => {
          const world = `${right} ${top}`;
          const state = "0 0 N";
          const isValid = valid === "a valid";

          const expectation = isValid ? "not " : "";

          it(`should ${expectation}throw an exception indicating that the coordinate is outside of accepted bounds`, () => {
            let expectation = expect(() => rover(`${world}\n${state}`));
            if (isValid) {
              expectation = expectation.not;
            }
            expectation.toThrow(
              `invalid world right top coordinate (${right} ${top}) received`
            );
          });
        }
      );

      describe("and a world with with top right coordinate of (5 3)", () => {
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

  describe("given multiple robots", () => {
    const robots = [
      { state: "1 1 E", instructions: "RFRFRFRF" },
      { state: "3 2 N", instructions: "FRRFLLFFRRFLL" },
      { state: "0 3 W", instructions: "LLFFFLFLFL" },
      { state: "0 3 N", instructions: "F" },
      { state: "1 0 S", instructions: "F" },
      { state: "5 1 E", instructions: "F" },
      { state: "0 3 N", instructions: "F" },
    ];
    const expectations = [
      "1 1 E",
      "3 3 N LOST",
      "2 3 S",
      "0 3 N LOST",
      "1 0 S LOST",
      "5 1 E LOST",
      "0 3 N",
    ];

    const stateDescription = robots
      .map(
        ({ state, instructions }) =>
          `state ${state} and instructions (${instructions})`
      )
      .join(" and ");

    describe(`with ${stateDescription} and a world with top right coordinate of (5 3)`, () => {
      const world = "5 3";
      const formatRobot = ({ state, instructions }) =>
        `${state}\n${instructions}`;
      const input = `${world}\n${robots.map(formatRobot).join("\n \n")}`;

      it(`should return the expected locations (${expectations.join(
        " and "
      )})`, () => {
        expect(rover(input)).toEqual(expectations.join("\n"));
      });
    });
  });
});
