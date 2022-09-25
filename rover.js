import { worldFactory } from "./worldFactory";
import { initialStateFactory } from "./initialStateFactory";
import { process } from "./process";

export default (input) => {
  const [worldGridTopRight, inputState, instructions = ""] = input.split("\n");
  const world = worldFactory(worldGridTopRight);
  const state = initialStateFactory(inputState);

  process(state, instructions, world);

  return state.toString();
};
