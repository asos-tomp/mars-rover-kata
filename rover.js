export default (input) => {
  const [, state, command] = input.split("\n");

  if (command) {
    const cardinals = ["N", "E", "S", "W"];
    const startOrientation = state.slice(-1);
    const startOrientationIndex = cardinals.indexOf(startOrientation);
    const newOrientation =
      cardinals[(startOrientationIndex + 1) % cardinals.length];

    return `0 0 ${newOrientation}`;
  }

  return state;
};
