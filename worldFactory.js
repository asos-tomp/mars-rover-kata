import { coordinateFactory } from "./coordinateFactory";

export const worldFactory = (input) => {
  const [right, top] = coordinateFactory(input);
  if (right < 0 || right > 50) {
    throw `invalid world width ${right} received`;
  }

  return { right, top, scentMarkers: [] };
};
