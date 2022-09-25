import { coordinateFactory } from "../coordinateFactory";

export const initialStateFactory = (input) => {
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
