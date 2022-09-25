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

const forwardCommand = (state, world) => {
  const matrix = {
    N: [0, 1],
    E: [1, 0],
    S: [0, -1],
    W: [-1, 0],
  };
  const {
    orientation,
    location: [x, y],
  } = state;
  const [deltaX, deltaY] = matrix[orientation];
  const newX = x + deltaX;
  const newY = y + deltaY;
  state.isLost = newX < 0 || newY < 0 || newX > world.right || newY > world.top;
  if (!state.isLost) {
    state.location = [newX, newY];
  }
};

const commandFactory = (instruction) => {
  const commandMap = {
    F: forwardCommand,
    L: leftCommand,
    R: rightCommand,
  };
  return commandMap[instruction];
};

const process = (state, instructions, world) => {
  const [instruction, ...remaining] = instructions;
  if (!instruction || state.isLost) {
    return state;
  }
  const command = commandFactory(instruction);
  command(state, world);

  return process(state, remaining, world);
};

const coordinateFactory = (input) => {
  const coords = input.split(" ").map((coord) => parseInt(coord));

  return coords;
};

const stateFactory = (input) => {
  const state = {
    location: coordinateFactory(input.slice(0, -2)),
    orientation: input.slice(-1),
    isLost: false,
    toString: () =>
      `${state.location.join(" ")} ${state.orientation}${
        state.isLost ? " LOST" : ""
      }`,
  };
  return state;
};

const worldFactory = (input) => {
  const [right, top] = coordinateFactory(input);
  return { right, top };
};

export default (input) => {
  const [worldGridTopRight, inputState, instructions = ""] = input.split("\n");
  const world = worldFactory(worldGridTopRight);
  const state = stateFactory(inputState);

  process(state, instructions, world);

  return state.toString();
};
