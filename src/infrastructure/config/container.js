"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const event_repository_1 = require("../persistence/event_repository");
const durable_append_log_1 = require("../journal/durable_append_log");
const snapshot_store_1 = require("../../event_sourcing/journal/snapshot_store");
const deposit_command_handler_1 = require("../../application/commands/deposit_command_handler");
const withdraw_command_handler_1 = require("../../application/commands/withdraw_command_handler");
const get_account_balance_query_1 = require("../../application/queries/get_account_balance_query");
const account_1 = require("../../domain/aggregates/account");
class Container {
    static createRepository(factory) {
        const log = new durable_append_log_1.DurableAppendLog();
        const snapshot = new snapshot_store_1.SnapshotStore("./data");
        return new event_repository_1.EventRepository(log, snapshot, factory);
    }
    static resolve() {
        const repository = this.createRepository((id) => new account_1.Account(id));
        const depositHandler = new deposit_command_handler_1.DepositCommandHandler(repository);
        const withdrawHandler = new withdraw_command_handler_1.WithdrawCommandHandler(repository);
        const balanceQuery = new get_account_balance_query_1.GetAccountBalanceQuery(repository);
        return { depositHandler, withdrawHandler, balanceQuery };
    }
}
exports.Container = Container;
