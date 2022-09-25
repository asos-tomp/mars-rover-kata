export const forwardCommand = (state, world) => {
  const matrix = {
    N: [0, 1],
    E: [1, 0],
    S: [0, -1],
    W: [-1, 0],
  };
  const {
    orientation,
    location: [x, y],
  } = state;
  const [deltaX, deltaY] = matrix[orientation];
  const newX = x + deltaX;
  const newY = y + deltaY;
  const wouldBeLost =
    newX < 0 || newY < 0 || newX > world.right || newY > world.top;

  if (wouldBeLost) {
    const scentMarker = `${x} ${y}`;
    if (world.scentMarker !== scentMarker) {
      state.isLost = true;
      world.scentMarker = scentMarker;
    }

    return;
  }

  state.location = [newX, newY];
};
