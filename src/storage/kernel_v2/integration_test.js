"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_kernel_v2_1 = require("./storage_kernel_v2");
const pulse_coordinator_1 = require("./pulse_coordinator");
const mesh_sync_1 = require("./mesh_sync");
const orchestrator_1 = require("./orchestrator");
const data_entity_1 = require("./data_entity");
async function runIntegrationTest() {
    console.log("[Test] Initializing MALEKA Integration Test...");
    // إعداد المكونات
    const kernel = new storage_kernel_v2_1.StorageKernelV2('./data_test');
    // الفجوة هنا: تفعيل النواة قبل الاستخدام
    await kernel.init();
    const pulse = new pulse_coordinator_1.PulseCoordinator();
    const mesh = new mesh_sync_1.MeshSync();
    const orchestrator = new orchestrator_1.DataOrchestrator(kernel, pulse, mesh);
    // إنشاء كيان بيانات
    const rawData = Buffer.from("Sovereign Data Packet");
    const entity = data_entity_1.EntityFactory.create(rawData, 'CRITICAL');
    // اختبار المعالجة
    await orchestrator.processIncomingData(entity.payload, 1n);
    console.log("[Test] Integration Successful: Kernel initialized and data processed.");
}
runIntegrationTest().catch(console.error);
