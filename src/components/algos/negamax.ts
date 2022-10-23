import { Coords, Matrix } from "../../types/Matrix";
import { Player } from "../../types/Player";
import { expand } from "./expand";
import { heuristic } from "./heuristics";

const switchPlayer = {
  [Player.PLAYER1]: Player.PLAYER2,
  [Player.PLAYER2]: Player.PLAYER1,
};

const color = {
  [Player.PLAYER1]: 1,
  [Player.PLAYER2]: -1,
};

export const negamax = (
  field: Matrix,
  player: Player,
  strikeLen: number,
  depth = 4
): { moveTo: Coords | null; score: number } => {
  const { isTerminal, score } = heuristic(field, strikeLen);
  //console.log("[negamax]", "depth is", depth, "current h is", score, "terminal:", isTerminal);
  if (depth === 0 || isTerminal) {
    return { moveTo: null, score: score * color[player] };
  }
  let value: number = -Infinity;
  let bestMove: Coords | null = null;
  for (const { matrix, move } of expand(field, player)) {
    const newV = -negamax(matrix, switchPlayer[player], strikeLen, depth - 1).score;
    //console.log("[negamax] new v is", newV);
    
    if (newV > value) {
      //console.log("[negamax]", "depth", depth, "reassigning best move to", JSON.stringify(bestMove));
      
      value = newV;
      bestMove = move;
    }
  }
  return { score: value, moveTo: bestMove };
};

export const negamaxab = (
  field: Matrix,
  player: Player,
  strikeLen: number,
  alpha: number = -Infinity,
  beta: number = +Infinity,
  depth = 4
): { moveTo: Coords | null; score: number } => {
  const { isTerminal, score } = heuristic(field, strikeLen);
  //console.log("[negamax]", "depth is", depth, "current h is", score, "terminal:", isTerminal);
  if (depth === 0 || isTerminal) {
    return { moveTo: null, score: score * color[player] };
  }
  let value: number = -Infinity;
  let bestMove: Coords | null = null;
  for (const { matrix, move } of expand(field, player)) {
    const newV = -negamaxab(matrix, switchPlayer[player], strikeLen, -beta, -alpha, depth - 1).score;
    alpha = Math.max(newV, alpha)
    if (newV > value) {
      value = newV;
      bestMove = move;
    }
    if (alpha >= beta) {
      break;
    }
  }
  return { score: value, moveTo: bestMove };
};

export const negascout = (
  field: Matrix,
  player: Player,
  strikeLen: number,
  alpha: number = -Infinity,
  beta: number = +Infinity,
  depth = 4
): { moveTo: Coords | null; score: number } => {
  
  const { isTerminal, score } = heuristic(field, strikeLen);
  if (depth === 0 || isTerminal) {
    return { moveTo: null, score: score * color[player] };
  }
  let value: number = -Infinity;
  let bestMove: Coords | null = null;
  let isFirstChild: boolean = true;
  for (const { matrix, move } of expand(field, player)) {
    let newV: number;
    if (isFirstChild) {
      newV = -negascout(
        matrix,
        switchPlayer[player],
        strikeLen,
        -beta,
        -alpha,
        depth - 1
      ).score;
    } else {
      newV = -negascout(
        matrix,
        switchPlayer[player],
        strikeLen,
        -alpha - 1,
        -alpha,
        depth - 1
      ).score;

      if (newV > alpha && newV < beta) {
        newV = -negascout(
          matrix,
          switchPlayer[player],
          strikeLen,
          -beta,
          -newV,
          depth - 1
        ).score;
      }
    }
    alpha = Math.max(newV, alpha);
    if (newV > value) {
      value = newV;
      bestMove = move;
    }
    if (alpha >= beta) {
      break;
    }
  }
  return { score: value, moveTo: bestMove };
};
