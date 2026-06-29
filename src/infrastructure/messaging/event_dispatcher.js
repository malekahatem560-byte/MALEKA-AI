"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcher = void 0;
const events_1 = require("events");
class EventDispatcher {
    emitter = new events_1.EventEmitter();
    handlers = new Map();
    register(eventType, handler) {
        const handlers = this.handlers.get(eventType) || [];
        handlers.push(handler);
        this.handlers.set(eventType, handlers);
    }
    async dispatch(event) {
        const handlers = this.handlers.get(event.eventType);
        if (handlers) {
            await Promise.all(handlers.map(handler => handler.handle(event)));
        }
    }
}
exports.EventDispatcher = EventDispatcher;
