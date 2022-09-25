import { process } from "./process";
import { initialStateFactory } from "./initialStateFactory";

export const robot = ({ inputState, instructions, world }) => {
  const state = initialStateFactory(inputState, world);

  return {
    process: () => process(state, instructions, world),
    toString: () => state.toString(),
  };
};
