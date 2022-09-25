const rotate = (state, delta) => {
  const cardinals = ["N", "E", "S", "W"];
  const modulo = (n, m) => ((n % m) + m) % m;
  state.orientation =
    cardinals[
      modulo(cardinals.indexOf(state.orientation) + delta, cardinals.length)
    ];
};

const leftCommand = (state) => rotate(state, -1);

const rightCommand = (state) => rotate(state, 1);

const forwardCommand = (state) => {
  state.isLost = true;
};

const commandFactory = (instruction) => {
  const commandMap = {
    F: forwardCommand,
    L: leftCommand,
    R: rightCommand,
  };
  return commandMap[instruction];
};

const process = (state, instructions) => {
  const [instruction, ...remaining] = instructions;
  if (!instruction) {
    return state;
  }
  const command = commandFactory(instruction);
  command(state);

  return process(state, remaining);
};

const stateFactory = (input) => {
  const state = {
    orientation: input.slice(-1),
    isLost: false,
    toString: () => `0 0 ${state.orientation}${state.isLost ? " LOST" : ""}`,
  };
  return state;
};

export default (input) => {
  const [, inputState, instructions = ""] = input.split("\n");
  const state = stateFactory(inputState);
  process(state, instructions);
  return state.toString();
};
