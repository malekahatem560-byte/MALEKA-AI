import { StorageKernelV2 } from '../storage/kernel_v2/storage_kernel_v2';
import { SystemOrchestrator } from './system_orchestrator';

async function runIntegrationTest() {
    console.log("[Test] Launching MALEKA Agent Integration Test...");
    
    // 1. تهيئة النواة
    const kernel = new StorageKernelV2('./data_test');
    await kernel.initialize();

    // 2. إطلاق المنسق (تفعيل الأجساد الثانوية)
    const orchestrator = new SystemOrchestrator(kernel);
    
    // 3. اختبار ترابط الوكيل التنفيذي (EXEC_01)
    await orchestrator.registry.dispatch('EXEC_01', { 
        data: Buffer.from("Sovereign Initialization Test"), 
        seq: 999n 
    });

    // 4. اختبار ترابط وكيل المراقبة (OBS_01)
    await orchestrator.registry.dispatch('OBS_01', { load: 95 });

    console.log("[Test] Integration Successful: All agents synchronized with Kernel.");
}

runIntegrationTest().catch(console.error);
