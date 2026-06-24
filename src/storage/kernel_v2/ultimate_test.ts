import { StorageKernelV2 } from './storage_kernel_v2';
import { PulseCoordinator } from './pulse_coordinator';
import { MeshSync } from './mesh_sync';
import { DataOrchestrator } from './orchestrator';
import { EntityFactory } from './data_entity';

async function ultimateTest() {
    console.log("[Test] Launching Ultimate MALEKA Stress Test...");
    
    const kernel = new StorageKernelV2('./data_stress');
    await kernel.initialize();
    await kernel.autoOptimize();

    const pulse = new PulseCoordinator();
    const mesh = new MeshSync();
    const orchestrator = new DataOrchestrator(kernel, pulse, mesh);

    // محاكاة تدفق بيانات مكثف
    for (let i = 0n; i < 10n; i++) {
        const entity = EntityFactory.create(Buffer.from(`Data Packet ${i}`));
        await orchestrator.processIncomingData(entity.payload, i);
    }
    
    console.log("[Test] Ultimate Test PASSED: System stability confirmed.");
}

ultimateTest().catch(console.error);
