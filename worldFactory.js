import { coordinateFactory } from "./coordinateFactory";

export const worldFactory = (input) => {
  let coords;
  try {
    coords = coordinateFactory(input);
  } catch (e) {
    throw `invalid world right top coordinate (${input}) received`;
  }
  const [right, top] = coords;

  return { right, top, scentMarkers: [] };
};
