import { leftCommand, rightCommand, forwardCommand } from "./commands";

export const commandFactory = (instruction) => {
  const commandMap = {
    F: forwardCommand,
    L: leftCommand,
    R: rightCommand,
  };
  return commandMap[instruction];
};
