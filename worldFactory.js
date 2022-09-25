import { coordinateFactory } from "./coordinateFactory";

export const worldFactory = (input) => {
  const [right, top] = coordinateFactory(input);
  return { right, top, scentMarkers: [] };
};
