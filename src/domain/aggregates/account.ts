import { BaseAggregate } from './base_aggregate';
import { DomainEvent } from '../../event_sourcing/domain_event';

export class Account extends BaseAggregate {
    private balance = 0;

    public deposit(amount: number): void {
        this.addEvent('Deposited', { amount });
    }

    public withdraw(amount: number): void {
        this.addEvent('Withdrawn', { amount });
    }

    protected apply(event: DomainEvent): void {
        switch (event.eventType) {
            case 'Deposited':
                this.balance += event.data.amount;
                break;

            case 'Withdrawn':
                this.balance -= event.data.amount;
                break;
        }
    }

    public getBalance(): number {
        return this.balance;
    }
}
