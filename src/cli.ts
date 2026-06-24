import { Container } from './infrastructure/config/container';
import { Account } from './domain/aggregates/account';

async function run() {
    // تم إزالة المعاملات الزائدة التي كانت تسبب الخطأ
    const repo = Container.createRepository((id: string) => new Account(id));
    console.log("CLI Engine Initialized.");
}
run().catch(console.error);
