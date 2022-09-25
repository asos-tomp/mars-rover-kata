export const coordinateFactory = (input) => {
  const coords = input.split(" ").map((coord) => parseInt(coord));

  return coords;
};
