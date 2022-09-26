import { robot } from "./robot";

export const robotsFactory = (input, world, output = []) => {
  if (!input.length) {
    return output;
  }

  const [inputState, instructions = ""] = input.splice(0, 3);
  output = [...output, robot({ inputState, instructions, world })];

  return robotsFactory(input, world, output);
};
