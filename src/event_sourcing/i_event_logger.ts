import { DomainEvent } from './domain_event';

export interface IEventLogger {
    append(id: string, aggregateId: string, eventType: string, version: number, data: any): Promise<void>;
    replay(aggregateId: string, callback: (event: DomainEvent) => Promise<void>): Promise<void>;
}
