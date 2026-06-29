import { DomainEvent } from '../../event_sourcing/domain_event';

export abstract class BaseAggregate {
    public id: string;
    public version: number = 0;

    private uncommittedEvents: DomainEvent[] = [];

    constructor(id: string) {
        this.id = id;
    }

    protected addEvent(type: string, data: any): void {
        const event: DomainEvent = {
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

    public loadFromHistory(history: DomainEvent[]): void {
        this.version = 0;
        this.uncommittedEvents = [];

        for (const event of history) {
            this.apply(event);
            this.version = event.metadata.version;
        }
    }

    public getUncommittedChanges(): DomainEvent[] {
        return this.uncommittedEvents;
    }

    public clearUncommittedChanges(): void {
        this.uncommittedEvents = [];
    }

    protected abstract apply(event: DomainEvent): void;
}
