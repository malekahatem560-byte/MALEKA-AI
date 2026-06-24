import { DurableAppendLog } from '../../infrastructure/journal/durable_append_log';

export class GetAccountBalanceQuery {
    constructor(private log: DurableAppendLog) {}

    public async execute(accountId: string): Promise<number> {
        let balance = 0;
        await this.log.replay(accountId, async (event: any) => {
            if (event.eventType === 'Deposited') {
                balance += event.data.amount;
            } else if (event.eventType === 'Withdrawn') {
                balance -= event.data.amount;
            }
        });
        return balance;
    }
}
