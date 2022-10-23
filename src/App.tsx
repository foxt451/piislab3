import React, { useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import GameScreen from "./components/GameScreen";
import { Algo } from "./components/algos";

enum AppStep {
  MENU,
  GAME,
}

function App() {
  const [appState, setAppState] = useState<AppStep>(AppStep.MENU);
  const [fieldSize, setFieldSize] = useState<number>(0);
  const [strikeLength, setStrikeLength] = useState<number>(0);
  const [algo, setAlgo] = useState<Algo>("negamax");

  return appState === AppStep.MENU ? (
    <Menu
      initFieldSize={5}
      initStrikeLength={4}
      onGameStart={(fieldSize, strikeLength, algo) => {
        setFieldSize(fieldSize);
        setStrikeLength(strikeLength);
        setAppState(AppStep.GAME);
        setAlgo(algo)
      }}
    />
  ) : (
    <GameScreen
      algorithm={algo}
      fieldSize={fieldSize}
      strikeLength={strikeLength}
      onGameQuit={() => {
        setAppState(AppStep.MENU);
      }}
    />
  );
}

export default App;
