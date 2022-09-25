import { robot } from "./robot";

export const robotsFactory = (input, world, output = []) => {
  if (!input.length) {
    return output;
  }

  const [inputState, instructions = "", _] = input.splice(0, 3);
  output = [...output, robot({ inputState, instructions, world })];

  return robotsFactory(input, world, output);
};
