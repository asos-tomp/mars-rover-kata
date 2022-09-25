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
    if (!world.isLost || x === 0 || y === 0) {
      state.isLost = true;
    }
    world.isLost = true;
    return;
  }

  state.location = [newX, newY];
};
