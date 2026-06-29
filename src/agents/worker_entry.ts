import { parentPort } from 'worker_threads';
import { SystemOrchestrator } from './system_orchestrator';
import { StorageKernelV2 } from '../storage/kernel_v2/storage_kernel_v2';

let orchestrator: SystemOrchestrator;

async function init() {
  const kernel = new StorageKernelV2('./storage_data');
  await kernel.initialize();
  orchestrator = new SystemOrchestrator(kernel);
}

init();

parentPort?.on('message', async ({ agentId, payload }) => {
  try {
    const result = await orchestrator.registry.dispatch(agentId, payload);

    parentPort?.postMessage({
      success: true,
      result
    });
  } catch (err: any) {
    parentPort?.postMessage({
      success: false,
      error: err.message
    });
  }
});
