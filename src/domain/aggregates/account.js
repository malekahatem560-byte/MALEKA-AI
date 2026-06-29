"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const base_aggregate_1 = require("./base_aggregate");
class Account extends base_aggregate_1.BaseAggregate {
    balance = 0;
    deposit(amount) {
        this.addEvent('Deposited', { amount });
    }
    withdraw(amount) {
        this.addEvent('Withdrawn', { amount });
    }
    apply(event) {
        switch (event.eventType) {
            case 'Deposited':
                this.balance += event.data.amount;
                break;
            case 'Withdrawn':
                this.balance -= event.data.amount;
                break;
        }
    }
    getBalance() {
        return this.balance;
    }
}
exports.Account = Account;
