import { IUpdatable } from "./IUpdatable";
import { LAG_TRESHOLD, TICK_RATE } from "./Constants";

export class GameClock {
    private m_updatable: IUpdatable;
    private m_previousTickTime: number;
    private m_lag: number;
    private m_intervalID: number | null;
    private m_onStartCatchup: ((totalTicks: number) => void) | null;
    private m_onFinishCatchup: (() => void) | null;

    public get totalLag(): number {
        return this.m_lag + (performance.now() - this.m_previousTickTime);
    }

    public get exceedsLagTreshold(): boolean {
        return this.totalLag >= LAG_TRESHOLD;
    }

    public get isActive(): boolean {
        return this.m_intervalID !== null;
    }

    public set onStartCatchup(callback: ((seconds: number) => void) | null) {
        this.m_onStartCatchup = callback;
    }

    public set onFinishCatchup(callback: (() => void) | null) {
        this.m_onFinishCatchup = callback;
    }

    constructor(updatable: IUpdatable) {
        this.m_updatable = updatable;
        this.m_previousTickTime = 0;
        this.m_lag = 0;
        this.m_intervalID = null;
        this.m_onStartCatchup = null;
        this.m_onFinishCatchup = null;
    }

    /**
     * Starts the timer and catches up to any pending lag.
     */
    public start() {
        if (this.m_intervalID !== null) {
            throw new Error('Clock is already running.');
        }

        if (this.m_previousTickTime !== 0) {
            this.catchup();
        } else {
            this.m_lag = 0;
            this.m_previousTickTime = performance.now();
        }

        this.m_intervalID = window.setInterval(this.tick.bind(this), TICK_RATE);
    }

    /**
     * Resets the pending lag and deltatime values.
     */
    public clear() {
        this.m_lag = 0;
        this.m_previousTickTime = performance.now();
    }

    /**
     * Stops the clock from ticking.
     */
    public stop() {
        if (this.m_intervalID !== null) {
            window.clearInterval(this.m_intervalID);
            this.m_intervalID = null;
        }
    }

    /**
     * Plays a given amount of ticks as fast as possible.
     */
    public simulateTicks(ticks: number) {
        const isRunning = this.m_intervalID !== null;
        if (isRunning) {
            this.stop();
        }

        this.m_lag += ticks;

        this.catchup();

        if (isRunning) {
            this.start();
        }
    }

    /**
     * Catches the simulation up with the pending lag amount.
     * Notifies callers of a catchup start and finish.
     */
    private catchup() {
        // Catch everything above the lag treshold.
        if (this.exceedsLagTreshold) {
            if (this.m_onStartCatchup)
                this.m_onStartCatchup(this.totalLag / TICK_RATE);

            this.tick();

            if (this.m_onFinishCatchup)
                this.m_onFinishCatchup();
        }

        // Catchup remainer (or whatever is below the treshold).
        this.tick();
    }

    /**
     * Runs a single tick (that can result in multiple ticks due to accumulated lag)
     */
    private tick() {
        const now = performance.now();
        const elapsed = now - this.m_previousTickTime;
        this.m_previousTickTime = now;

        this.m_lag += elapsed;
        while (this.m_lag >= TICK_RATE) {
            this.update(TICK_RATE / 1000)
            this.m_lag -= TICK_RATE;
        }

        //this.render(this.lag / TICK_RATE);
    }

    private update(deltaTime: number) {
        this.m_updatable.update(deltaTime);
    }

    private render(deltaTime: number) {

    }
}