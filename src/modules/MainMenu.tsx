import { GameContext } from "@game/core/GameContext";
import { DataLoader } from "@game/data/DataLoader";
import React from "react";


interface MainMenuProps {
  onStartGame: (gameContext: GameContext) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
    // Handle actual sign in and verification of user
  const handleLoginAndCharacterSelect = async (characterId: string) => {

    const dataLoader = new DataLoader();
    await dataLoader.downloadAndRegisterPackage("assets/data/exo-data.json");
    const context = dataLoader.createGameContext();

    // Load user data based on userID.
    context.loadData();
    onStartGame(context);
  };

  return (
    <div className="main-menu">
      <button onClick={() => handleLoginAndCharacterSelect("character1")}>
        Start Game
      </button>
    </div>
  );
};

export default MainMenu;
