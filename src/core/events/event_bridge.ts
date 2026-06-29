import { EventBus } from '../event_bus';

type Handler = (payload?: any) => void;

/**
 * MALEKA EventBridge
 * Compatibility layer between:
 * publish/subscribe API (legacy usage)
 * emit/on EventBus core
 */
export class EventBridge {
  constructor(private bus: EventBus) {}

  // legacy -> core
  public publish(event: string, payload?: any): void {
    this.bus.emit(event, payload);
  }

  public subscribe(event: string, handler: Handler): void {
    this.bus.on(event, handler);
  }

  public unsubscribe(event: string, handler: Handler): void {
    this.bus.off(event, handler);
  }
}
