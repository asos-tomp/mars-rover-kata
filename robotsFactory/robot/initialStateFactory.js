import { coordinateFactory } from "../../coordinateFactory";

export const initialStateFactory = (input, { right, top }) => {
  let location;
  const locationString = input.slice(0, -2);
  try {
    location = coordinateFactory(locationString);
    const [x, y] = location;
    if (x > right || y > top) {
      throw "invalid";
    }
  } catch (e) {
    throw `invalid start location ${locationString} received`;
  }

  const state = {
    location,
    orientation: input.slice(-1),
    isLost: false,
    toString: () =>
      `${state.location.join(" ")} ${state.orientation}${
        state.isLost ? " LOST" : ""
      }`,
  };
  return state;
};
