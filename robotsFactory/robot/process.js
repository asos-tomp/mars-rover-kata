import { commandFactory } from "./commandFactory";

export const process = (state, instructions, world) => {
  const [instruction, ...remaining] = instructions;
  if (!instruction || state.isLost) {
    return state;
  }
  const command = commandFactory(instruction);
  command(state, world);

  return process(state, remaining, world);
};
