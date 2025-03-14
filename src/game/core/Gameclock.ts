import { IUpdatable } from "./IUpdatable";

const TICK_RATE = 1000 / 50;

export class Gameclock {
    private updatable: IUpdatable;
    private previousTickTime: number;
    private lag: number;
    private intervalID: number | null;

    constructor(updatable: IUpdatable) {
        this.updatable = updatable;
        this.previousTickTime = performance.now();
        this.lag = 0;
        this.intervalID = null;
    }

    public start() {
        if (this.intervalID !== null) {
            throw new Error('Clock is already running.');
        }
        this.lag = 0;
        this.previousTickTime = performance.now();
        this.intervalID = window.setInterval(this.tick.bind(this), TICK_RATE);
    }

    public stop() {
        if (this.intervalID !== null) {
            window.clearInterval(this.intervalID);
            this.intervalID = null;
        }
    }

    /**
     * Plays a given amount of ticks as fast as possible.
     */
    public simulateTicks(seconds: number) {
        const isRunning = this.intervalID !== null;
        if (isRunning) {
            this.stop();
        }

        this.lag += seconds * 1000;
        this.tick();

        if (isRunning) {
            this.start();
        }
    }

    private tick() {
        const now = performance.now();
        const elapsed = now - this.previousTickTime;
        this.previousTickTime = now;

        this.lag += elapsed;
        while (this.lag >= TICK_RATE) {
            this.update(TICK_RATE / 1000)
            this.lag -= TICK_RATE;
        }

        //this.render(this.lag / TICK_RATE);
    }



    private update(deltaTime: number) {

        this.updatable.update(deltaTime);
    }

    private render(deltaTime: number) {

    }
}