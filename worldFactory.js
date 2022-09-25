import { coordinateFactory } from "./coordinateFactory";

export const worldFactory = (input) => {
  const coords = coordinateFactory(input);
  const [right, top] = coords;
  const isInvalid = (coord) => coord > 50 || coord < 0;

  if (coords.some(isInvalid)) {
    throw `invalid world right top coordinate (${right} ${top}) received`;
  }

  return { right, top, scentMarkers: [] };
};
