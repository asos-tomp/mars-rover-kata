import { worldFactory } from "./worldFactory";
import { robotsFactory } from "./robotsFactory";

export default (input) => {
  const [worldGridTopRight, ...rest] = input.split("\n");

  const world = worldFactory(worldGridTopRight);
  const robots = robotsFactory(rest, world);
  robots.forEach(({ process }) => process());

  const output = robots.map(({ toString }) => toString()).join("\n");

  return output;
};
