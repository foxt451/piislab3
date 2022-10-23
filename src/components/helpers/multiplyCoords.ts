import { Coords } from "../../types/Matrix";

export const multiplyCoords = (c1: Coords, scalar: number): Coords => {
  return { x: c1.x * scalar, y: c1.y * scalar };
};
