export interface DomainEvent {
    eventId?: string;
    aggregateId: string;
    eventType: string;
    metadata: {
        version: number;
    };
    data: any;
    timestamp?: number;
}
