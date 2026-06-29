"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositCommandHandler = void 0;
class DepositCommandHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(command) {
        // 1. استعادة الحالة الحالية للكيان من المستودع
        const account = await this.repository.load(command.accountId);
        // 2. تنفيذ المنطق التجاري (Business Logic)
        account.deposit(command.amount);
        // 3. حفظ التغييرات في السجل الدائم
        await this.repository.save(account);
        console.log(`[CommandHandler] Successfully processed deposit for: ${command.accountId}`);
    }
}
exports.DepositCommandHandler = DepositCommandHandler;
