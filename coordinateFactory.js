export const coordinateFactory = (input) => {
  const coords = input.split(" ").map((coord) => parseInt(coord));

  const isInvalid = (coord) => coord > 50 || coord < 0;
  if (coords.some(isInvalid)) {
    throw "invalid";
  }

  return coords;
};
