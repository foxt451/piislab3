import { Coords, Matrix } from "../../types/Matrix";

export const isInBounds = (c: Coords, m: Matrix): boolean => {
  return c.x >= 0 && c.y >= 0 && c.y < m.length && c.x < m[0].length;
};
