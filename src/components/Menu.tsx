import React, { useState } from "react";
import { Algo } from "./algos";

type Props = {
  onGameStart: (fieldSize: number, strikeLength: number, algo: Algo) => void;
  initFieldSize: number;
  initStrikeLength: number;
};

const Menu = ({ onGameStart, initFieldSize, initStrikeLength }: Props) => {
  const [fieldSize, setFieldSize] = useState<string>(initFieldSize.toString());
  const [strikeLength, setStrikeLength] = useState<string>(
    initStrikeLength.toString()
  );
  const [algorithm, setAlgorithm] = useState<Algo>("negamax");

  return (
    <main>
      <h1 style={{ textAlign: "center" }}>Tic-Tac-Toe</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "center",
        }}
      >
        <label>
          Field size (min 3)
          <input
            type="number"
            value={fieldSize}
            style={{ marginLeft: 20 }}
            onChange={(e) => setFieldSize(e.target.value)}
          />
        </label>
        <label>
          Strike length (min 3, not larger than field size)
          <input
            type="number"
            value={strikeLength}
            style={{ marginLeft: 20 }}
            onChange={(e) => setStrikeLength(e.target.value)}
          />
        </label>
        <label>
          Algorithm
          <select
            style={{ marginLeft: 20 }}
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as Algo)}
          >
            <option value="negamax">Negamax</option>
            <option value="negamaxab">Negamax & alpha/beta</option>
            <option value="negascout">Negascout</option>
          </select>
        </label>
        <button
          onClick={() => {
            const fSize = Number(fieldSize);
            const sLen = Number(strikeLength);
            if (fSize >= 3 && fSize >= sLen) {
              onGameStart(fSize, sLen, algorithm);
            }
          }}
        >
          Start!
        </button>
      </div>
    </main>
  );
};

export default Menu;
