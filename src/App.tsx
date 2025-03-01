import React, { useState, useEffect } from "react";
import { GameContext } from "../src/game/core/GameContext";
import Sidebar from "./components/Sidebar";
import GameScreen from "@modules/GameScreen";
import Ticker from "@game/core/Ticker";
import { ActiveViewProvider } from "@modules/common/ActiveViewProvider";
import "./App.css"

import { DataGenerator } from "../data_generation/DataGenerator.ts"
import { DataLoader } from "@game/data/DataLoader.ts";

// TODO: Load asset file instead of this crap.
const data = JSON.parse(DataGenerator.serialize('exo'));


const dataLoader = new DataLoader();
dataLoader.registerPackage(data);
const context = dataLoader.createGameContext();

const App: React.FC = () => {
  const [gameContext, setGameContext] = useState<GameContext | null>(null);

  useEffect(() => {
    // TODO: Save and load player data
    setGameContext(context);
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
