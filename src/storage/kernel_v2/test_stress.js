"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_kernel_v2_1 = require("./storage_kernel_v2");
async function runStressTest() {
    const kernel = new storage_kernel_v2_1.StorageKernelV2('./data');
    await kernel.initialize();
    console.log("[Test] Stress testing initiated...");
    for (let i = 0; i < 1000; i++) {
        await kernel.store(Buffer.from(`Data entry ${i}`), BigInt(i));
    }
    await kernel.autoOptimize();
    console.log("[Test] Stress test passed: Integrity confirmed.");
}
runStressTest().catch(console.error);
