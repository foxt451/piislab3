import React, { useCallback, useEffect, useState } from "react";
import { CellContent, Coords, Matrix } from "../types/Matrix";
import { Player } from "../types/Player";
import { Algo, getNextMove } from "./algos";
import GameField from "./GameField/GameField";
import { checkForWin } from "./helpers/checkForWin";

type Props = {
  onGameQuit: () => void;
  fieldSize: number;
  strikeLength: number;
  algorithm: Algo;
};

enum GameState {
  IN_PROGRESS,
  WIN,
}

const GameScreen = ({
  fieldSize,
  onGameQuit,
  strikeLength,
  algorithm,
}: Props) => {
  const [gameMatrix, setGameMatrix] = useState<Matrix>(
    [...Array(fieldSize)].map(() =>
      [...Array(fieldSize)].map(() => CellContent.EMPTY)
    )
  );
  const [movingPlayer, setMovingPlayer] = useState(Player.PLAYER1);
  const [lastMove, setLastMove] = useState<Coords | null>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.IN_PROGRESS);

  const putIntoMatrix = useCallback(
    (player: Player, coords: Coords) => {
      const matrixCopy = gameMatrix.map((row) => row.map((cell) => cell));
      matrixCopy[coords.y][coords.x] =
        player === Player.PLAYER1 ? CellContent.PLAYER1 : CellContent.PLAYER2;
      setGameMatrix(matrixCopy);
      setLastMove(coords);
      const winner = checkForWin(matrixCopy, coords, strikeLength);

      if (winner !== null) {
        setGameState(GameState.WIN);
      }
    },
    [gameMatrix, strikeLength]
  );

  useEffect(() => {
    if (
      movingPlayer === Player.PLAYER2 &&
      gameState === GameState.IN_PROGRESS
    ) {
      const nextMove = getNextMove(
        Player.PLAYER2,
        gameMatrix,
        strikeLength,
        algorithm
      );
      console.log("[GameScreen]", "Next move obtained:", nextMove);

      if (nextMove !== null) {
        putIntoMatrix(Player.PLAYER2, nextMove);
        setMovingPlayer(Player.PLAYER1);
      }
    }
  }, [
    algorithm,
    gameMatrix,
    gameState,
    movingPlayer,
    putIntoMatrix,
    strikeLength,
  ]);

  return (
    <div>
      <GameField
        fieldMatrix={gameMatrix}
        fieldSize={fieldSize}
        onPlayerCellClick={(coords) => {
          if (
            gameState === GameState.IN_PROGRESS &&
            movingPlayer === Player.PLAYER1 &&
            gameMatrix[coords.y][coords.x] === CellContent.EMPTY
          ) {
            setMovingPlayer(Player.PLAYER2);
            putIntoMatrix(Player.PLAYER1, coords);
          }
        }}
      />
      {gameState === GameState.WIN && lastMove && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        >
          <h1>
            {gameMatrix[lastMove.y][lastMove.x] === CellContent.PLAYER1
              ? "PLAYER 1 "
              : "PLAYER 2 "}
            wins
          </h1>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
