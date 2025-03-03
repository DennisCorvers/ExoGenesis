import React, { useState, useEffect } from "react";
import { GameContext } from "../src/game/core/GameContext";
import Sidebar from "./components/Sidebar";
import GameScreen from "@modules/GameScreen";
import Ticker from "@game/core/Ticker";
import { ActiveViewProvider } from "@modules/common/ActiveViewProvider";
import "./App.css"

import { DataLoader } from "@game/data/DataLoader.ts";

const App: React.FC = () => {
  const [gameContext, setGameContext] = useState<GameContext | null>(null);

  useEffect(() => {
    // We need this part to load the game data, before the UI elements are built.
    const dataLoader = new DataLoader();
    dataLoader.downloadAndRegisterPackage("/assets/data/exo-data.json").then(() => {
      const context = dataLoader.createGameContext();
      setGameContext(context);
    })

  }, []);

  return (
    <ActiveViewProvider>
      <div className="app-container">
        {gameContext ? (
          <>
            <Sidebar gameContext={gameContext} />
            <div className="main-content">
              <GameScreen gameContext={gameContext} />
              <Ticker gameContext={gameContext} />
            </div>
          </>
        ) : (
          <div className="loading-message">Loading Game...</div>
        )}
      </div>
    </ActiveViewProvider>
  );
};

export default App;
