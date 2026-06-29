import { EventRepository } from '../../infrastructure/persistence/event_repository';
import { Account } from '../../domain/aggregates/account';

export class GetAccountBalanceQuery {
    constructor(private repository: EventRepository<Account>) {}

    public async execute(accountId: string): Promise<number> {
        const account = await this.repository.load(accountId);
        return account.getBalance();
    }
}
