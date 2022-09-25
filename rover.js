export default (input) => {
  const [, state, instructions] = input.split("\n");

  if (instructions === "RR") {
    return "0 0 S";
  }

  if (instructions) {
    let cardinals = ["N", "E", "S", "W"];
    if (instructions === "L") {
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
