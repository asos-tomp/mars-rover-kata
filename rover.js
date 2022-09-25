export default (input) => {
  const [, state, instruction] = input.split("\n");

  if (instruction) {
    let cardinals = ["N", "E", "S", "W"];
    if (instruction === "L") {
      cardinals.reverse();
    }

    const startOrientation = state.slice(-1);
    const startOrientationIndex = cardinals.indexOf(startOrientation);
    const newOrientation =
      cardinals[(startOrientationIndex + 1) % cardinals.length];

    return `0 0 ${newOrientation}`;
  }

  return state;
};
