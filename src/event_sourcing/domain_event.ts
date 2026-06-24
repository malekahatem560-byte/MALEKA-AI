export interface DomainEvent {
    aggregateId: string;
    eventType: string;
    metadata: { 
        version: number;
        [key: string]: any; 
    };
    data: any;
}
