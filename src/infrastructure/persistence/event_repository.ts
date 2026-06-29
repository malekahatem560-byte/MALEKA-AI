import { BaseAggregate } from '../../domain/aggregates/base_aggregate';
import { DomainEvent } from '../../event_sourcing/domain_event';
import { DurableAppendLog } from '../journal/durable_append_log';
import { SnapshotStore } from '../../event_sourcing/journal/snapshot_store';

export class EventRepository<T extends BaseAggregate> {
    constructor(
        private log: DurableAppendLog,
        private snapshot: SnapshotStore,
        private factory: (id: string) => T
    ) {}

    public async save(aggregate: T): Promise<void> {
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
            state: (aggregate as any).exportState?.(),
            version: aggregate.version
        });
    }

    public async load(id: string): Promise<T> {
        const aggregate = this.factory(id);

        const snap = await this.snapshot.loadSnapshot(id);
        let versionCutoff = 0;

        if (snap?.version) {
            (aggregate as any).importState?.(snap.state);
            versionCutoff = snap.version;
        }

        const events: DomainEvent[] = [];

        await this.log.replay(id, async (event: DomainEvent) => {
            events.push(event);
        });

        aggregate.loadFromHistory(events);

        return aggregate;
    }
}
