import React, { useState, useEffect, useRef } from "react";
import { GameContext } from "../src/game/core/GameContext";
import Sidebar from "./components/Sidebar";
import GameScreen from "@modules/GameScreen";
import { ActiveViewProvider } from "@modules/common/ActiveViewProvider";


import { DataLoader } from "@game/data/DataLoader.ts";
import NotificationManager from "@components/NotificationManager";
import { Gameclock } from "@game/core/Gameclock";
import Visibility from "./utils/AppVisibility";
import "./App.css"

const App: React.FC = () => {
  const gameClock = useRef<Gameclock>(null);
  const [gameContext, setGameContext] = useState<GameContext | null>(null);

  useEffect(() => {

    Visibility.subscribe('statusChanged', x => {
      
    });

    // We need this part to load the game data, before the UI elements are built.
    const dataLoader = new DataLoader();
    dataLoader.downloadAndRegisterPackage("assets/data/exo-data.json").then(() => {
      const context = dataLoader.createGameContext();

      //TODO: Actually load player data based on chosen profile.
      context.loadData();
      gameClock.current = new Gameclock(context);

      // Start clock after load etc.
      gameClock.current.start();
      setGameContext(context);
    })

    return () => {
      gameClock.current?.stop();
      Visibility.unsubscribe('statusChanged');
    }
  }, []);

  return (
    <ActiveViewProvider>
      <div className="app-container">
        {gameContext ? (
          <>
            <Sidebar gameContext={gameContext} />
            <div className="main-content">
              <GameScreen gameContext={gameContext} />
            </div>
            <NotificationManager gameContext={gameContext} />
          </>
        ) : (
          <div className="loading-message">Loading Game...</div>
        )}
      </div>
    </ActiveViewProvider>
  );
};

export default App;
