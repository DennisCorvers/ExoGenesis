import { GameContext } from "@game/core/GameContext";
import { DataLoader } from "@game/data/DataLoader";
import React, { useEffect, useState } from "react";


interface MainMenuProps {
  onStartGame: (gameContext: GameContext) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadGame = async () => {
      const dataLoader = new DataLoader();
      await dataLoader.downloadAndRegisterPackage("assets/data/exo-data.json");


      const context = dataLoader.createGameContext();
      context.loadData();

      onStartGame(context);
    };

    loadGame().catch((error) => {
      console.error("Error loading game data:", error);
      setLoading(false);
    });
  }, [onStartGame]);



  return (
    <div className="main-menu">
      {loading ? (
        <h1>Loading game...</h1>
      ) : (
        <h1>Failed to load game. Please try again.</h1>
      )}
    </div>
  );
};

export default MainMenu;
