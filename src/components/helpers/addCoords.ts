import { Coords } from "../../types/Matrix";

export const addCoords = (c1: Coords, c2: Coords): Coords => {
  return { x: c1.x + c2.x, y: c1.y + c2.y };
};
