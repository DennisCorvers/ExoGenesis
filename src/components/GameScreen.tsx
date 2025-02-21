import React from 'react';
import { GameContext } from '../game/core/GameContext';
import MineralHarvestingUI from './skillUI/MineralHarvestingUI';

interface GameScreenProps {
  gameContext: GameContext;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameContext }) => {
  return (
    <div className="game-screen">
      <h1>Game Screen</h1>
      <div className="game-ui">
        {/* Rendering MiningUI as part of the screen */}
        <MineralHarvestingUI gameContext={gameContext} />
        
        {/* Add other components here as you expand the game */}
      </div>
    </div>
  );
};

export default GameScreen;
