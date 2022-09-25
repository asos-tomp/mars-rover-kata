const rotate = (orientation, delta) => {
  const cardinals = ["N", "E", "S", "W"];
  const modulo = (n, m) => ((n % m) + m) % m;
  return cardinals[
    modulo(cardinals.indexOf(orientation) + delta, cardinals.length)
  ];
};

const leftCommand = (orientation) => rotate(orientation, -1);

const rightCommand = (orientation) => rotate(orientation, 1);

const forwardCommand = (orientation) => `${orientation} LOST`;

const commandFactory = (instruction) => {
  const commandMap = {
    F: forwardCommand,
    L: leftCommand,
    R: rightCommand,
  };
  return commandMap[instruction];
};

const process = (orientation, instructions) => {
  const [instruction, ...remaining] = instructions;
  if (!instruction) {
    return orientation;
  }
  const command = commandFactory(instruction);
  orientation = command(orientation);

  return process(orientation, remaining);
};

export default (input) => {
  const [, state, instructions = ""] = input.split("\n");

  let orientation = state.slice(-1);
  orientation = process(orientation, instructions);

  return `0 0 ${orientation}`;
};
