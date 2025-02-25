import { useEffect, useRef } from "react";
import { GameContext } from "./GameContext";

const TICK_RATE = 1000 / 60;

export default function Ticker({ gameContext }: { gameContext: GameContext }) {
  const requestRef = useRef<number | null>(null);
  const gameContextRef = useRef(gameContext);
  const previousTimeRef = useRef(performance.now());
  const lagRef = useRef(0);

  const update = (deltaTime: number) => {
    gameContextRef.current.update(deltaTime);
  }

  const render = (deltaTime: number) => {
    deltaTime = deltaTime;
  }

  const tick = (now: number) => {
    const elapsed = now - previousTimeRef.current
    previousTimeRef.current = now;
    lagRef.current += elapsed;

    while (lagRef.current >= TICK_RATE) {
      update(TICK_RATE / 1000);
      lagRef.current -= TICK_RATE;
    }

    render(lagRef.current / TICK_RATE);
    requestRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(tick);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameContext]);

  return null;
}