import React, { Suspense } from "react";
import { useActiveView } from "./common/ActiveViewProvider";
import { GameContext } from "@game/core/GameContext";

const MineralHarvestingUI = React.lazy(() => import("@modules/mineralharvesting/MineralHarvestingUI"))

interface GameScreenProps {
  gameContext: GameContext;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameContext }) => {
  const { activeView } = useActiveView();

  const viewComponents: { [key: string]: React.LazyExoticComponent<React.FC<any>> } = {
    mineralharvestingskill: MineralHarvestingUI,
  };

  const ActiveViewComponent = viewComponents[activeView as keyof typeof viewComponents];


  //TODO: Maybe remove the loading / unloading of components for a smoother experience?
  // Will have to see about the performance of things.
  return (
    <div>
      <h2>Game Screen</h2>
      <Suspense fallback={<div>Loading...</div>}>
        {ActiveViewComponent ? <ActiveViewComponent gameContext={gameContext} /> : null}
      </Suspense>
    </div>
  );
};

export default GameScreen;
