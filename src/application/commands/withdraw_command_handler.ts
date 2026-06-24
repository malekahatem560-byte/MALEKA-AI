import { EventRepository } from '../../infrastructure/persistence/event_repository';
import { Account } from '../../domain/aggregates/account';

export class WithdrawCommandHandler {
    constructor(private readonly repository: EventRepository<Account>) {}

    public async handle(command: { accountId: string, amount: number }): Promise<void> {
        const account = await this.repository.load(command.accountId);
        account.withdraw(command.amount);
        await this.repository.save(account);
    }
}
