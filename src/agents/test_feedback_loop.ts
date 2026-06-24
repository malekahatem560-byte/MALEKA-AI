import { StorageKernelV2 } from '../storage/kernel_v2/storage_kernel_v2';
import { SystemOrchestrator } from './system_orchestrator';
import { executeFeedbackLoop } from './inter_agent_protocol';

/**
 * اختبار التكامل والترابط (Integration Test)
 * للتحقق من أن جميع الوكلاء يعملون بتناغم تحت إشراف المنسق.
 */
async function runFeedbackTest() {
    const kernel = new StorageKernelV2('./data_feedback');
    await kernel.initialize();
    const orchestrator = new SystemOrchestrator(kernel);

    console.log("[Test] Running MALEKA Integrated Feedback Loop...");
    
    // محاكاة ضغط نظام عالي (85%)
    await executeFeedbackLoop(orchestrator, 85);
    
    console.log("[Test] Feedback Loop Completed Successfully.");
}

runFeedbackTest().catch(console.error);
