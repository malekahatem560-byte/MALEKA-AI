import { EventRepository } from '../../infrastructure/persistence/event_repository';
import { Account } from '../../domain/aggregates/account';

export class DepositCommandHandler {
    constructor(private repository: EventRepository<Account>) {}

    public async handle(command: { accountId: string; amount: number }): Promise<void> {
        // 1. استعادة الحالة الحالية للكيان من المستودع
        const account = await this.repository.load(command.accountId);
        
        // 2. تنفيذ المنطق التجاري (Business Logic)
        account.deposit(command.amount);
        
        // 3. حفظ التغييرات في السجل الدائم
        await this.repository.save(account);
        
        console.log(`[CommandHandler] Successfully processed deposit for: ${command.accountId}`);
    }
}
