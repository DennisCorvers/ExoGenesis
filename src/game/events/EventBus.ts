import { BaseEvent } from "./BaseEvent";

export type SkillEventHandler<T extends BaseEvent = BaseEvent> = (payload: T) => void;
type SkillEventHandlerList<T extends BaseEvent = BaseEvent> = Array<SkillEventHandler<T>>;

export class EventBus {
  private static m_instance: EventBus;
  private events: Map<string, SkillEventHandlerList> = new Map();

  private constructor() { }

  public static get instance(): EventBus {
    if (!EventBus.m_instance) {
      EventBus.m_instance = new EventBus();
    }
    return EventBus.m_instance;
  }

  public subscribe<T extends BaseEvent>(eventType: string, handler: SkillEventHandler<T>): void {
    if (!this.events.has(eventType)) {
      this.events.set(eventType, []);
    }
    (this.events.get(eventType) as SkillEventHandlerList<T>).push(handler);
  }

  public unsubscribe<T extends BaseEvent>(eventType: string, handler?: SkillEventHandler<T>): void {
    if (!this.events.has(eventType))
      return;

    if (!handler) {
      this.events.delete(eventType);
    } else {
      const handlers = this.events.get(eventType) as SkillEventHandlerList<T>;
      const index = handlers.indexOf(handler);

      if (index !== -1) {
        handlers.splice(index, 1);
      }

      if (handlers.length === 0) {
        this.events.delete(eventType);
      }
    }
  }

  public publish<T extends BaseEvent>(eventType: string, payload: T): void {
    const handlers = this.events.get(eventType);
    if (handlers) {
      handlers.slice().forEach(handler => handler(payload));
    }
  }
}
