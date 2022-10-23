import { CellContent, Coords, Matrix } from "../../types/Matrix";
import { Player } from "../../types/Player";

export const expand = (
  field: Matrix,
  currentPlayer: Player
): { matrix: Matrix; move: Coords }[] => {
  let states: { matrix: Matrix; move: Coords }[] = [];
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === CellContent.EMPTY) {
        const matrixCopy = field.map((row) => row.map((cell) => cell));
        matrixCopy[i][j] =
          currentPlayer === Player.PLAYER1
            ? CellContent.PLAYER1
            : CellContent.PLAYER2;
        states.push({ matrix: matrixCopy, move: { x: j, y: i } });
      }
    }
  }
  return states;
};
