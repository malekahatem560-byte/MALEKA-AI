"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepository = void 0;
class EventRepository {
    log;
    snapshot;
    factory;
    constructor(log, snapshot, factory) {
        this.log = log;
        this.snapshot = snapshot;
        this.factory = factory;
    }
    async save(aggregate) {
        const changes = aggregate.getUncommittedChanges();
        for (const event of changes) {
            await this.log.append({
                aggregateId: aggregate.id,
                eventType: event.eventType,
                metadata: event.metadata,
                data: event.data,
                timestamp: event.timestamp
            });
        }
        aggregate.clearUncommittedChanges();
        await this.snapshot.saveSnapshot({
            aggregateId: aggregate.id,
            state: aggregate.exportState?.(),
            version: aggregate.version
        });
    }
    async load(id) {
        const aggregate = this.factory(id);
        const snap = await this.snapshot.loadSnapshot(id);
        let versionCutoff = 0;
        if (snap?.version) {
            aggregate.importState?.(snap.state);
            versionCutoff = snap.version;
        }
        const events = [];
        await this.log.replay(id, async (event) => {
            events.push(event);
        });
        aggregate.loadFromHistory(events);
        return aggregate;
    }
}
exports.EventRepository = EventRepository;
