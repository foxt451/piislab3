import { Coords, Matrix } from "../../types/Matrix";
import { Player } from "../../types/Player";
import { negamax, negamaxab, negascout } from "./negamax";

export type Algo = "negamax" | "negamaxab" | "negascout";

export const getNextMove = (
  currentPlayer: Player,
  matrix: Matrix,
  strikeLen: number,
  algo: Algo
): Coords | null => {
  if (algo === "negamax") {
    //console.log("[getNextMove]", "entering negamax");
    const { moveTo } = negamax(matrix, currentPlayer, strikeLen);
    return moveTo;
  } else if (algo === "negamaxab") {
    const { moveTo } = negamaxab(matrix, currentPlayer, strikeLen);
    return moveTo;
  } else if (algo === "negascout") {
    const { moveTo } = negascout(matrix, currentPlayer, strikeLen);
    return moveTo;
  }
  return null;
};
