import { GameClock } from "./Gameclock";
import { GameContext } from "./GameContext";
import Visibility from '../../utils/AppVisibility'


export class GameManager {
    private m_clock: GameClock;
    private m_gameContext: GameContext;
    private m_isAppActive: boolean = true;

    constructor(gameContext: GameContext) {
        this.m_clock = new GameClock(gameContext);
        this.m_clock.clear();
        this.m_clock.onStartCatchup = this.onStartCatchup;
        this.m_clock.onFinishCatchup = this.onFinishCatchup;
        this.m_gameContext = gameContext;


        Visibility.subscribe('statusChanged', x => {
            if (x?.status === 'active') {
                this.onSetActive();
            }
            else {
                this.onSetInactive();
            }
        });
    }

    private onSetActive() {
    this.m_clock.simulateTicks(1000 * 60 * 30);
        this.m_isAppActive = true;

        if (this.m_isAppActive && !this.m_clock.isActive) {
            this.m_clock.start();
        }
    }

    private onSetInactive() {
        this.m_isAppActive = false;

        if (!this.m_isAppActive && this.m_clock.isActive) {
            this.m_clock.stop();
        }
    }

    private onStartCatchup = (totalTicks: number) => {
        console.log("Starting catchup: " + totalTicks + ' ticks');
    }

    private onFinishCatchup = () => {
        console.log("Finished catching up.");
    }

    public startGame() {
        this.m_clock.start();
    }

    public restartGame() {
        this.m_clock.clear();
        this.m_clock.start();
    }

    public pauseGame() {
        this.m_clock.stop();
    }

    public stopGame() {
        this.m_clock.stop();
    }

    public cleanup() {
        this.m_clock.stop();
        Visibility.unsubscribe('statusChanged');
    }
}