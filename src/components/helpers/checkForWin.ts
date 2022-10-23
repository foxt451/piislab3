import { CellContent, Coords, Matrix } from "../../types/Matrix";
import { Player } from "../../types/Player";
import { addCoords } from "./addCoords";
import { isInBounds } from "./isInBounds";
import { multiplyCoords } from "./multiplyCoords";

export const checkForWin = (
  field: Matrix,
  lastMove: Coords,
  strikeLen: number
): Player | null => {
  // go vertically, horizontally and diagonally to see if there is a strike
  console.log(
    "[check for win] examining",
    field[lastMove.y][lastMove.x] === CellContent.PLAYER1
      ? "Player1"
      : field[lastMove.y][lastMove.x] === CellContent.PLAYER2
      ? "Player2"
      : "Empty"
  );

  let dirs: Coords[] = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: -1, y: 1 },
  ];
  for (const dir of dirs) {
    let striken = 1;
    // "bound" becomes null, if there is a gap in that direction
    let forwardBound: Coords | null = addCoords(lastMove, dir);
    let backBound: Coords | null = addCoords(lastMove, multiplyCoords(dir, -1));
    while ((forwardBound || backBound) && striken < strikeLen) {
      if (forwardBound) {
        if (
          isInBounds(forwardBound, field) &&
          field[forwardBound.y][forwardBound.x] ===
            field[lastMove.y][lastMove.x]
        ) {
          forwardBound = addCoords(forwardBound, dir);
          striken++;
        } else {
          forwardBound = null;
        }
      }
      if (backBound) {
        if (
          isInBounds(backBound, field) &&
          field[backBound.y][backBound.x] === field[lastMove.y][lastMove.x]
        ) {
          backBound = addCoords(backBound, multiplyCoords(dir, -1));
          striken++;
        } else {
          backBound = null;
        }
      }
    }
    console.log("[check for win] found strike of", striken);

    if (striken >= strikeLen) {
      return field[lastMove.y][lastMove.x] === CellContent.PLAYER1
        ? Player.PLAYER1
        : Player.PLAYER2;
    }
  }
  return null;
};
