import { coordinateFactory } from "./coordinateFactory";

export const worldFactory = (input) => {
  const [right, top] = coordinateFactory(input);
  if (right < 0 || right > 50) {
    throw `invalid world right coordinate ${right} received`;
  }

  return { right, top, scentMarkers: [] };
};
