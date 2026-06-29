import { EventRepository } from '../persistence/event_repository';
import { BaseAggregate } from '../../domain/aggregates/base_aggregate';
import { DurableAppendLog } from '../journal/durable_append_log';
import { SnapshotStore } from '../../event_sourcing/journal/snapshot_store';

import { DepositCommandHandler } from '../../application/commands/deposit_command_handler';
import { WithdrawCommandHandler } from '../../application/commands/withdraw_command_handler';
import { GetAccountBalanceQuery } from '../../application/queries/get_account_balance_query';
import { Account } from '../../domain/aggregates/account';

export class Container {

    public static createRepository<T extends BaseAggregate>(factory: (id: string) => T): EventRepository<T> {
        const log = new DurableAppendLog();
        const snapshot = new SnapshotStore("./data");

        return new EventRepository(log, snapshot, factory);
    }

    public static resolve() {

        const repository = this.createRepository((id) => new Account(id));

        const depositHandler = new DepositCommandHandler(repository);
        const withdrawHandler = new WithdrawCommandHandler(repository);
        const balanceQuery = new GetAccountBalanceQuery(repository);

        return { depositHandler, withdrawHandler, balanceQuery };
    }
}
