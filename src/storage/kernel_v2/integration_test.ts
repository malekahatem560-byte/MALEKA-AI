import { StorageKernelV2 } from './storage_kernel_v2';
import { PulseCoordinator } from './pulse_coordinator';
import { MeshSync } from './mesh_sync';
import { DataOrchestrator } from './orchestrator';
import { EntityFactory } from './data_entity';

async function runIntegrationTest() {
    console.log("[Test] Initializing MALEKA Integration Test...");
    
    // إعداد المكونات
    const kernel = new StorageKernelV2('./data_test');
    
    // الفجوة هنا: تفعيل النواة قبل الاستخدام
    await kernel.init(); 
    
    const pulse = new PulseCoordinator();
    const mesh = new MeshSync();
    const orchestrator = new DataOrchestrator(kernel, pulse, mesh);

    // إنشاء كيان بيانات
    const rawData = Buffer.from("Sovereign Data Packet");
    const entity = EntityFactory.create(rawData, 'CRITICAL');

    // اختبار المعالجة
    await orchestrator.processIncomingData(entity.payload, 1n);
    
    console.log("[Test] Integration Successful: Kernel initialized and data processed.");
}

runIntegrationTest().catch(console.error);
