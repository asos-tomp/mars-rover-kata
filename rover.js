export default (input) => {
  const [, state, instructions] = input.split("\n");

  if (instructions) {
    let cardinals = ["N", "E", "S", "W"];
    if (instructions.startsWith("L")) {
      cardinals.reverse();
    }

    const startOrientation = state.slice(-1);
    const startOrientationIndex = cardinals.indexOf(startOrientation);
    const rotations = instructions.length;

    const newOrientation =
      cardinals[(startOrientationIndex + rotations) % cardinals.length];

    return `0 0 ${newOrientation}`;
  }

  return state;
};
