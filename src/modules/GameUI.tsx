import { GameContext } from "@game/core/GameContext";
import { useEffect, useRef } from "react";
import { ActiveViewProvider } from "./common/ActiveViewProvider";
import { GameManager } from "@game/core/GameManager";
import Sidebar from "@components/Sidebar";
import GameContent from "./GameContent";
import NotificationManager from "@components/NotificationManager";
import '../App.css'

interface GameUIProps {
    gameContext: GameContext;
}

const GameUI: React.FC<GameUIProps> = ({ gameContext }) => {
    const gameManager = useRef<GameManager>(null);

    useEffect(() => {
        gameManager.current = new GameManager(gameContext);
        gameManager.current.startGame();

        return () => {
            gameManager.current?.cleanup();
            gameManager.current = null;
        }
    }, [gameContext]);

    return (
        <ActiveViewProvider>
            <div className="app-container">
                {gameContext ? (
                    <>
                        <Sidebar gameContext={gameContext} />
                        <div className="main-content">
                            <GameContent gameContext={gameContext} />
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

export default GameUI;
