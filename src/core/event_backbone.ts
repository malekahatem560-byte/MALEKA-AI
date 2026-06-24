import { MALEKAEvent } from './event_types';

export class EventBackbone {
    private queue: MALEKAEvent[] = [];
    private history: MALEKAEvent[] = [];
    private dlq: MALEKAEvent[] = [];
    private handlers: Map<string, Array<(p: any) => void>> = new Map();

    public publish(type: string, payload: any): void {
        const event: MALEKAEvent = { type, payload, timestamp: Date.now() };
        this.history.push(event);
        const eventHandlers = this.handlers.get(type) || [];
        
        eventHandlers.forEach(handler => {
            try {
                handler(payload);
            } catch (e) {
                this.dlq.push(event);
            }
        });
    }

    public subscribe(type: string, handler: (payload: any) => void): void {
        if (!this.handlers.has(type)) this.handlers.set(type, []);
        this.handlers.get(type)!.push(handler);
    }
}
