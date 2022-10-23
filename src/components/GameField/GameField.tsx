import React from "react";
import { CellContent, Coords, Matrix } from "../../types/Matrix";
import styles from "./styles.module.css";

type Props = {
  fieldSize: number;
  fieldMatrix: Matrix;
  onPlayerCellClick: (coords: Coords) => void;
};

const classDict = {
  [CellContent.EMPTY]: styles["empty"],
  [CellContent.PLAYER1]: styles["p1"],
  [CellContent.PLAYER2]: styles["p2"],
};

const GameField = ({ fieldSize, onPlayerCellClick, fieldMatrix }: Props) => {
  return (
    <div
      className={styles["field"]}
      style={{
        gridTemplateColumns: `repeat(${fieldSize}, 1fr)`,
      }}
    >
      {[...Array(fieldSize ** 2)].map((_, i) => (
        <div
          className={`${styles["cell"]} ${
            classDict[fieldMatrix[Math.floor(i / fieldSize)][i % fieldSize]]
          }`}
          key={i}
          onClick={() => {
            onPlayerCellClick({
              x: i % fieldSize,
              y: Math.floor(i / fieldSize),
            });
          }}
        ></div>
      ))}
    </div>
  );
};

export default GameField;
