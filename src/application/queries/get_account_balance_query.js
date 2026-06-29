"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAccountBalanceQuery = void 0;
class GetAccountBalanceQuery {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(accountId) {
        const account = await this.repository.load(accountId);
        return account.getBalance();
    }
}
exports.GetAccountBalanceQuery = GetAccountBalanceQuery;
