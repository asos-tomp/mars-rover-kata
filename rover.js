export default (input) => {
  const [, state, command] = input.split("\n");

  if (command) {
    if (state === "0 0 N") return "0 0 E";
    return "0 0 S";
  }

  return state;
};
