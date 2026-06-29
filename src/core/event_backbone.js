"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBackbone = void 0;
class EventBackbone {
    queue = [];
    history = [];
    dlq = [];
    handlers = new Map();
    publish(type, payload) {
        const event = { type, payload, timestamp: Date.now() };
        this.history.push(event);
        const eventHandlers = this.handlers.get(type) || [];
        eventHandlers.forEach(handler => {
            try {
                handler(payload);
            }
            catch (e) {
                this.dlq.push(event);
            }
        });
    }
    subscribe(type, handler) {
        if (!this.handlers.has(type))
            this.handlers.set(type, []);
        this.handlers.get(type).push(handler);
    }
}
exports.EventBackbone = EventBackbone;
