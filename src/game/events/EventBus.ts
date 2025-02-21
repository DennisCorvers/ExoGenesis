import { BaseEvent } from "./BaseEvent";

type EventCallback<T extends BaseEvent> = (event: T) => void;

export class EventBus {
  private static _instance: EventBus;
  private subscribers: Record<string, EventCallback<any>[]> = {};

  private constructor() {}

  public static get instance(): EventBus {
    if (!EventBus._instance) {
      EventBus._instance = new EventBus();
    }
    return EventBus._instance;
  }

  public subscribe<T extends BaseEvent>(eventClass: new (...args: any[]) => T, callback: EventCallback<T>): void {
    const eventType = eventClass.name;

    if (!this.subscribers[eventType]) {
      this.subscribers[eventType] = [];
    }

    this.subscribers[eventType].push(callback);
  }

  public unsubscribe<T extends BaseEvent>(eventClass: new (...args: any[]) => T, callback: EventCallback<T>): void {
    const eventType = eventClass.name;

    if (!this.subscribers[eventType]) return;

    this.subscribers[eventType] = this.subscribers[eventType].filter(
      (cb) => cb !== callback
    );
  }

  public publish<T extends BaseEvent>(event: T): void {
    const eventType = event.constructor.name;

    if (!this.subscribers[eventType]) return;

    this.subscribers[eventType].forEach((callback) => callback(event));
  }
}
