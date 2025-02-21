import React, { useState, useEffect } from 'react';
import GameScreen from './modules/GameScreen'
import GameLoop from './game/core/GameLoop';
import { GameContext } from './game/core/GameContext';

const App: React.FC = () => {
  const [gameContext, setGameContext] = useState<GameContext | null>(null);

  useEffect(() => {
    // Load game context here some time...
    const context = new GameContext();
    setGameContext(context);
  }, []);

  return (
    <div className="app">
      {gameContext ? (
        <>
          {/* Render the GameScreen with the gameContext */}
          <GameScreen gameContext={gameContext} />

          {/* Start the game loop */}
          <GameLoop gameContext={gameContext} />
        </>
      ) : (
        <div>Loading Game...</div>
      )}
    </div>
  );
};

export default App;
