import { BaseAggregate } from '../../domain/aggregates/base_aggregate';
import { DomainEvent } from '../../event_sourcing/domain_event';
import { DurableAppendLog } from '../journal/durable_append_log';

export class EventRepository<T extends BaseAggregate> {
    constructor(private log: DurableAppendLog, private factory: (id: string) => T) {}

    public async save(aggregate: T): Promise<void> {
        const changes = aggregate.getUncommittedChanges();
        for (const event of changes) {
            await this.log.append(aggregate.id, event.aggregateId, event.eventType, event.metadata.version, event.data);
        }
        aggregate.clearUncommittedChanges();
    }

    public async load(id: string): Promise<T> {
        const aggregate = this.factory(id);
        const history: DomainEvent[] = [];
        await this.log.replay(id, async (event: any) => { history.push(event); });
        aggregate.loadFromHistory(history);
        return aggregate;
    }
}
