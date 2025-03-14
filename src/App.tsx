import { GameContext } from "@game/core/GameContext";
import GameUI from "@modules/GameUI";
import MainMenu from "@modules/MainMenu";
import React, { useState } from "react";

const App: React.FC = () => {
  const [gameContext, setGameContext] = useState<GameContext | null>(null);

  // If there's no gameContext, we assume the user isn't past the main menu.
  if (!gameContext) {
    return <MainMenu onStartGame={setGameContext} />;
  }

  return <GameUI gameContext={gameContext} />;
};

export default App;
