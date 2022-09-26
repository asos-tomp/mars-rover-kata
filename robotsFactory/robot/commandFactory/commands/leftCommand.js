import { rotate } from "./rotate";

export const leftCommand = (state) => rotate(state, -1);

leftCommand.instruction = "L";
