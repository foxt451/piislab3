import { CellContent, Matrix } from "../../types/Matrix";
import { Player } from "../../types/Player";

export const heuristic = (
  matrix: Matrix,
  strikeLen: number
): { score: number; isTerminal: boolean } => {
  let h = 0;
  // horizontal rows
  for (let i = 0; i < matrix.length; i++) {
    const { isTerminal, score } = evaluateRow(matrix[i], strikeLen);
    if (isTerminal) {
      return { score, isTerminal };
    }
    h += score;
  }
  // vertical columns
  for (let i = 0; i < matrix.length; i++) {
    const column = matrix.map((row) => row[i]);
    const { isTerminal, score } = evaluateRow(column, strikeLen);
    if (isTerminal) {
      return { score, isTerminal };
    }
    h += score;
  }
  // diagonal lower half
  for (let i = 0; i < matrix.length; i++) {
    // y: +1, x: +1
    const diagonal = matrix.slice(i).map((row, ind) => row[ind]);
    const { isTerminal, score } = evaluateRow(diagonal, strikeLen);
    if (isTerminal) {
      return { score, isTerminal };
    }
    h += score;

    // y: +1, x: -1
    const diagonal2 = matrix.slice(i).map((row, ind) => row[row.length - 1 - ind]);
    const { isTerminal: isTerminal2, score: score2 } = evaluateRow(diagonal2, strikeLen);
    if (isTerminal2) {
      return { score: score2, isTerminal: isTerminal2 };
    }
    h += score2;
  }
  // diagonal upper half
  for (let i = 1; i < matrix.length; i++) {
    const diagonal = matrix
      .slice(0, matrix.length - i)
      .map((row, ind) => row.slice(i)[ind]);
    const { isTerminal, score } = evaluateRow(diagonal, strikeLen);
    if (isTerminal) {
      return { score, isTerminal };
    }
    h += score;

    const diagonal2 = matrix
      .slice(0, matrix.length - i)
      .map((row, ind) => row[row.length - 1 - i - ind]);
    const { isTerminal: isTerminal2, score: score2 } = evaluateRow(
      diagonal2,
      strikeLen
    );
    if (isTerminal2) {
      return { score: score2, isTerminal: isTerminal2 };
    }
    h += score2;
  }

  // check for tie
  const hasEmpty = matrix.some((row) =>
    row.some((cell) => cell === CellContent.EMPTY)
  );
  if (!hasEmpty) {
    return { isTerminal: true, score: 0 };
  }
  return { isTerminal: false, score: h };
};

const cellToPlayer = {
  [CellContent.PLAYER1]: Player.PLAYER1,
  [CellContent.PLAYER2]: Player.PLAYER2,
  [CellContent.EMPTY]: null,
};

export const evaluateRow = (
  row: CellContent[],
  strikeLen: number
): { score: number; isTerminal: boolean } => {
  let curPlayer: Player | null = null;
  let consecutivePlayer = 0;
  let totalPlayer = 0;
  let totalEmpty = 0;
  let h = 0;

  const getCurScore = (): number => {
    if (totalPlayer + totalEmpty < strikeLen) {
      return 0;
    }
    return totalPlayer ** 2 / totalEmpty;
  };

  for (let i = 0; i < row.length; i++) {
    const curCellPlayer = cellToPlayer[row[i]];
    if (curCellPlayer !== null && curPlayer !== curCellPlayer) {
      h += getCurScore() * (curPlayer === Player.PLAYER1 ? 1 : -1);
      curPlayer = curCellPlayer;
      consecutivePlayer = 1;
      totalPlayer = 1;
      totalEmpty = 0;
    } else if (curCellPlayer !== null) {
      consecutivePlayer++;
      totalPlayer++;
      if (consecutivePlayer >= strikeLen) {
        console.log("LOOOOONG");
        
        return {
          score: 100_000 * (curPlayer === Player.PLAYER1 ? 1 : -1),
          isTerminal: true,
        };
      }
    } else {
      consecutivePlayer = 0;
      totalEmpty++;
    }
  }
  h += getCurScore() * (curPlayer === Player.PLAYER1 ? 1 : -1);
  return { score: h, isTerminal: false };
};
