"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawCommandHandler = void 0;
class WithdrawCommandHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(command) {
        const account = await this.repository.load(command.accountId);
        account.withdraw(command.amount);
        await this.repository.save(account);
    }
}
exports.WithdrawCommandHandler = WithdrawCommandHandler;
