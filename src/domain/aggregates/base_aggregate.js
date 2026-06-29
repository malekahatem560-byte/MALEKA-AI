"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAggregate = void 0;
class BaseAggregate {
    id;
    version = 0;
    uncommittedEvents = [];
    constructor(id) {
        this.id = id;
    }
    addEvent(type, data) {
        const event = {
            eventId: crypto.randomUUID(),
            aggregateId: this.id,
            eventType: type,
            metadata: {
                version: this.version + 1
            },
            data,
            timestamp: Date.now()
        };
        this.apply(event);
        this.uncommittedEvents.push(event);
        this.version++;
    }
    loadFromHistory(history) {
        this.version = 0;
        this.uncommittedEvents = [];
        for (const event of history) {
            this.apply(event);
            this.version = event.metadata.version;
        }
    }
    getUncommittedChanges() {
        return this.uncommittedEvents;
    }
    clearUncommittedChanges() {
        this.uncommittedEvents = [];
    }
}
exports.BaseAggregate = BaseAggregate;
