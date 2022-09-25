import { coordinateFactory } from "./coordinateFactory";

export const worldFactory = (input) => {
  const [right, top] = coordinateFactory(input);
  if (right === 51) {
    throw "invalid world width 51 received";
  }
  return { right, top, scentMarkers: [] };
};
