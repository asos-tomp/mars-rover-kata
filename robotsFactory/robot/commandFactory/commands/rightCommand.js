import { rotate } from "./rotate";

export const rightCommand = (state) => rotate(state, 1);

rightCommand.instruction = "R";
