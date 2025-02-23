import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GameContext } from "./game/core/GameContext";
import Sidebar from "./components/Sidebar";
import GameScreen from "./modules/GameScreen";
import GameLoop from "./game/core/GameLoop";
import "./App.css"
import { ActiveViewProvider } from "./modules/common/ActiveViewProvider";

const App: React.FC = () => {
  const [gameContext, setGameContext] = useState<GameContext | null>(null);

  useEffect(() => {
    const context = new GameContext();
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
              <GameLoop gameContext={gameContext} />
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
