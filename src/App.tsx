import React, { useState, useEffect } from "react";
import { GameContext } from "../src/game/core/GameContext";
import Sidebar from "./components/Sidebar";
import GameScreen from "@modules/GameScreen";
import Ticker from "@game/core/Ticker";
import { ActiveViewProvider } from "@modules/common/ActiveViewProvider";
import "./App.css"


const App: React.FC = () => {
  const [gameContext, setGameContext] = useState<GameContext | null>(null);

  useEffect(() => {
    const context = new GameContext();
    // TODO: Save and load player data
    setGameContext(context);
  }, []);

  return (
    <ActiveViewProvider>
      <div>
        <Sidebar />
        <div className="main-content">
          {gameContext ? (
            <>
              <GameScreen gameContext={gameContext} />
              <Ticker gameContext={gameContext} />
            </>
          ) : (
            <div>Loading Game...</div>
          )}
        </div>
      </div>
    </ActiveViewProvider>
  );
};

export default App;
