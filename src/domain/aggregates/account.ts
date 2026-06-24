import { BaseAggregate } from './base_aggregate';
import { DomainEvent } from '../../event_sourcing/domain_event';
export class Account extends BaseAggregate {
    constructor(id: string) { super(id); }
    public deposit(amount: number): void { this.addEvent('Deposited', { amount }); }
    public withdraw(amount: number): void { this.addEvent('Withdrawn', { amount }); }
    protected apply(event: DomainEvent): void { console.log(`Applying event: ${event.eventType}`); }
}
