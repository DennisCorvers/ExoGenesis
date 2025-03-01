import React, { Suspense, useMemo } from "react";
import { useActiveView } from "./common/ActiveViewProvider";
import { GameContext } from "@game/core/GameContext";
import { ISidebarEntry } from "@game/ui/ISidebarEntry";
import ErrorBoundary from "./common/ErrorBoundary";

interface GameScreenProps {
  gameContext: GameContext;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameContext }) => {
  const { activeView } = useActiveView();

  const viewComponents = useMemo(() => {
    const components: { [key: string]: React.LazyExoticComponent<React.FC<any>> } = {};

    const addView = (sidebarEntry: ISidebarEntry) => {
      if (!components[sidebarEntry.route]) {
        components[sidebarEntry.route] = React.lazy(() => import(/* @vite-ignore */ `./${sidebarEntry.module}`)
          .catch(ex => {
            console.error(`Error loading module ${sidebarEntry.module}:`, ex);
            return import('../modules/common/ErrorPage');
          })
        );
      }
    };

    gameContext.layout.sidebarLayout.sidebarData
      .flatMap(category => category.entries)
      .forEach(addView);

    return components;
  }, []);

  const ActiveViewComponent = viewComponents[activeView as keyof typeof viewComponents];

  //TODO: Maybe remove the loading / unloading of components for a smoother experience?
  // Will have to see about the performance of things.
  return (
    <div>
      <ErrorBoundary fallback={<div>Error loading component.</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <h2>Game Screen</h2>
          {ActiveViewComponent ? <ActiveViewComponent gameContext={gameContext} /> : null}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default GameScreen;
