import * as commands from "./commands";

const commandMap = Object.values(commands).reduce(
  (map, command) => ({
    ...map,
    [command.instruction]: command,
  }),
  {}
);

export const commandFactory = (instruction) => commandMap[instruction];
