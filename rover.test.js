describe("Mars Rover", () => {
  let rover;

  beforeAll(async () => {
    ({ default: rover } = await import("./rover.js"));
  });

  it("should export a function as a default export", () => {
    expect(rover).toBeInstanceOf(Function);
  });

  describe("given a minimum viable world (single unit size), a single robot with a valid start location (0,0) and orientation cardinal (N), and no moves", () => {
    const origin = "0 0";
    const world = `${origin}`;
    const location = `${origin}`;
    const orientation = "N";

    it("should return the starting state unchanged", () => {
      const state = `${location} ${orientation}`;
      expect(rover(`${world}\n${state}`)).toEqual(state);
    });
  });
});
