import { Container } from './infrastructure/config/container';

async function testMALEKA() {
    console.log("--- STARTING MALEKA INTEGRATION TEST ---");
    const { depositHandler, withdrawHandler, balanceQuery } = Container.resolve();
    const accountId = `test-${Date.now()}`;

    // 1. الإيداع
    await depositHandler.handle({ accountId, amount: 500 });
    console.log("Deposit: 500 processed.");

    // 2. السحب
    await withdrawHandler.handle({ accountId, amount: 200 });
    console.log("Withdraw: 200 processed.");

    // 3. التحقق من الرصيد
    const balance = await balanceQuery.execute(accountId);
    console.log(`Final Balance: ${balance}`);

    if (balance === 300) {
        console.log("--- TEST PASSED: MALEKA CORE LOGIC VERIFIED ---");
    } else {
        console.error("--- TEST FAILED: LOGIC MISMATCH ---");
    }
}

testMALEKA().catch(console.error);
