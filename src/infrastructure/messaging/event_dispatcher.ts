import { EventEmitter } from 'events';
import { DomainEvent } from '../../event_sourcing/domain_event';

export interface EventHandler<T = any> {
    handle(event: T): Promise<void>;
}

export class EventDispatcher {
    private readonly emitter = new EventEmitter();
    private readonly handlers: Map<string, EventHandler[]> = new Map();

    public register(eventType: string, handler: EventHandler): void {
        const handlers = this.handlers.get(eventType) || [];
        handlers.push(handler);
        this.handlers.set(eventType, handlers);
    }

    public async dispatch(event: DomainEvent): Promise<void> {
        const handlers = this.handlers.get(event.eventType);
        if (handlers) {
            await Promise.all(handlers.map(handler => handler.handle(event)));
        }
    }
}
