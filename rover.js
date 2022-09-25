export default (input) => {
  const [, state, instructions] = input.split("\n");

  if (instructions) {
    const cardinals = ["N", "E", "S", "W"];

    const startOrientation = state.slice(-1);
    let orientationIndex = cardinals.indexOf(startOrientation);
    const instructionDeltaMap = {
      L: -1,
      R: 1,
    };
    const modulo = (n, m) => ((n % m) + m) % m;
    instructions.split("").forEach((instruction) => {
      orientationIndex = modulo(
        orientationIndex + instructionDeltaMap[instruction],
        4
      );
    });
    const newOrientation = cardinals[orientationIndex];

    return `0 0 ${newOrientation}`;
  }

  return state;
};
