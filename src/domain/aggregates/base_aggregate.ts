import { DomainEvent } from '../../event_sourcing/domain_event';
export abstract class BaseAggregate {
    public id: string;
    public version: number = 0;
    private uncommittedEvents: DomainEvent[] = [];
    constructor(id: string) { this.id = id; }
    protected addEvent(type: string, data: any): void {
        const event: DomainEvent = { aggregateId: this.id, eventType: type, metadata: { version: ++this.version }, data: data };
        this.uncommittedEvents.push(event);
    }
    public getUncommittedChanges(): DomainEvent[] { return this.uncommittedEvents; }
    public clearUncommittedChanges(): void { this.uncommittedEvents = []; }
    public loadFromHistory(history: DomainEvent[]): void {
        for (const event of history) { this.version = event.metadata.version; this.apply(event); }
    }
    protected abstract apply(event: DomainEvent): void;
}
