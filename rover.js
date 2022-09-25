export default (input) => {
  const [, state, instructions] = input.split("\n");

  if (instructions) {
    let cardinals = ["N", "E", "S", "W"];
    if (instructions === "L") {
      cardinals.reverse();
    }

    const startOrientation = state.slice(-1);
    const startOrientationIndex = cardinals.indexOf(startOrientation);
    const rotations = ["RR", "LL"].includes(instructions) ? 2 : 1;
    const newOrientation =
      cardinals[(startOrientationIndex + rotations) % cardinals.length];

    return `0 0 ${newOrientation}`;
  }

  return state;
};
