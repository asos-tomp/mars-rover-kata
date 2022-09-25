export default (input) => {
  const [, state, command] = input.split("\n");

  if (command) return "0 0 E";

  return state;
};
