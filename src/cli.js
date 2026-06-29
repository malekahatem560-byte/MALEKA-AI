"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./infrastructure/config/container");
const account_1 = require("./domain/aggregates/account");
async function run() {
    // تم إزالة المعاملات الزائدة التي كانت تسبب الخطأ
    const repo = container_1.Container.createRepository((id) => new account_1.Account(id));
    console.log("CLI Engine Initialized.");
}
run().catch(console.error);
