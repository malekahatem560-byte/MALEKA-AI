"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const system_orchestrator_1 = require("./system_orchestrator");
const storage_kernel_v2_1 = require("../storage/kernel_v2/storage_kernel_v2");
let orchestrator;
async function init() {
    const kernel = new storage_kernel_v2_1.StorageKernelV2('./storage_data');
    await kernel.initialize();
    orchestrator = new system_orchestrator_1.SystemOrchestrator(kernel);
}
init();
worker_threads_1.parentPort?.on('message', async ({ agentId, payload }) => {
    try {
        const result = await orchestrator.registry.dispatch(agentId, payload);
        worker_threads_1.parentPort?.postMessage({
            success: true,
            result
        });
    }
    catch (err) {
        worker_threads_1.parentPort?.postMessage({
            success: false,
            error: err.message
        });
    }
});
