"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBridge = void 0;
/**
 * MALEKA EventBridge
 * Compatibility layer between:
 * publish/subscribe API (legacy usage)
 * emit/on EventBus core
 */
class EventBridge {
    bus;
    constructor(bus) {
        this.bus = bus;
    }
    // legacy -> core
    publish(event, payload) {
        this.bus.emit(event, payload);
    }
    subscribe(event, handler) {
        this.bus.on(event, handler);
    }
    unsubscribe(event, handler) {
        this.bus.off(event, handler);
    }
}
exports.EventBridge = EventBridge;
