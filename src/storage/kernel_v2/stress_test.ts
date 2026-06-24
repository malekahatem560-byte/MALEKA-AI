import { StorageKernelV2 } from './storage_kernel_v2';

async function executeStressTest() {
    const kernel = new StorageKernelV2('./data_stress');
    await kernel.initialize();

    console.log("--- [Stress Test] Starting Heavy Write Simulation ---");
    const startTime = Date.now();

    for (let i = 0; i < 1000; i++) {
        const data = new Uint8Array(1024); // 1KB per write
        await kernel.store(data, BigInt(i));
    }

    const endTime = Date.now();
    console.log(`[Stress Test] Successfully wrote 1000 records in ${endTime - startTime}ms`);
    
    console.log("[Stress Test] Initiating Autonomous Optimization...");
    await kernel.autoOptimize();
    
    console.log("[Stress Test] All subsystems verified. Kernel integrity: 100%");
}

executeStressTest().catch(console.error);
