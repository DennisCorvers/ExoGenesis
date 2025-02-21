import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { GameContext } from "../game/core/GameContext";
import MineralHarvestingUI from "../modules/mineralharvesting/MineralHarvestingUI"

interface GameScreenProps {
  gameContext: GameContext;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameContext }) => {
  return (
    <div>
      <h2>Game Screen</h2>
      {/* Switch to handle routing */}
      <Routes>
        <Route path="/mineralharvesting" element={<MineralHarvestingUI gameContext={gameContext} />} />
        {/* Add more routes for other sections */}
      </Routes>
    </div>
  );
};

export default GameScreen;
