"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
class EventBus {
    handlers = new Map();
    on(event, handler) {
        const list = this.handlers.get(event) || [];
        list.push(handler);
        this.handlers.set(event, list);
    }
    off(event, handler) {
        const list = this.handlers.get(event);
        if (!list)
            return;
        this.handlers.set(event, list.filter(h => h !== handler));
    }
    emit(event, payload) {
        const list = this.handlers.get(event);
        if (!list)
            return;
        for (const h of list)
            h(payload);
    }
}
exports.EventBus = EventBus;
