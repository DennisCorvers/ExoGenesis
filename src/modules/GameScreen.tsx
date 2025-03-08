import React, { Suspense, useMemo } from "react";
import { useActiveView } from "./common/ActiveViewProvider";
import { ISidebarEntry } from "@game/ui/ISidebarEntry";
import ErrorBoundary from "./common/ErrorBoundary";
import { GameContext } from "@game/core/GameContext";

interface GameScreenProps {
  gameContext: GameContext;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameContext }) => {
  const { activeView } = useActiveView();

  const viewComponents = useMemo(() => {
    // Import modules with correct typing
    const modules = import.meta.glob(
      [
        '../modules/*/**.tsx',
        '!../modules/common/**'
      ]
    );
    const components: { [key: string]: React.LazyExoticComponent<React.FC<any>> } = {};

    const isEmpty = (str: string): boolean => {
      return str === null || str === undefined || str === "";
    }

    const addView = (sidebarEntry: ISidebarEntry) => {
      // No module to route.
      if (isEmpty(sidebarEntry.module) || isEmpty(sidebarEntry.route)) {
        return;
      }

      if (components[sidebarEntry.route] !== undefined) {
        return;
      }

      const modulePath = `./${sidebarEntry.module}.tsx`;
      const importer = modules[modulePath];
      if (!importer) {
        console.error(`Module not found: ${modulePath}`);

        components[sidebarEntry.route] = React.lazy(() =>
          import('../modules/common/ErrorPage') as Promise<{ default: React.FC<any> }>
        );

        return;
      }

      components[sidebarEntry.route] = React.lazy(() =>
        importer()
          .then((module) => module as { default: React.FC<any> })
          .catch(async (error) => {
            console.error(`Error loading module ${modulePath}:`, error);
            return import('../modules/common/ErrorPage') as Promise<{ default: React.FC<any> }>;
          })
      );
    };

    // Ensure the dependency array is accurate
    gameContext.layout.sidebarLayout.sidebarData
      .flatMap((category) => category.entries)
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
