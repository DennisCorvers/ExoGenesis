import { GameContext } from "@game/core/GameContext";
import { useEffect, useRef, useState } from "react";
import { Gameclock } from "@game/core/Gameclock";
import { ActiveViewProvider } from "./common/ActiveViewProvider";
import Sidebar from "@components/Sidebar";
import GameContent from "./GameContent";
import NotificationManager from "@components/NotificationManager";
import Visibility from '../utils/AppVisibility'
import '../App.css'

interface GameUIProps {
    gameContext: GameContext;
}

const GameUI: React.FC<GameUIProps> = ({ gameContext }) => {
    const gameClock = useRef<Gameclock>(null);

    useEffect(() => {

        Visibility.subscribe('statusChanged', x => {

        });


        gameClock.current = new Gameclock(gameContext);
        gameClock.current.start();

        return () => {
            gameClock.current?.stop();
            Visibility.unsubscribe('statusChanged');
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
