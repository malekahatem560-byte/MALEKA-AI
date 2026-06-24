import { SystemOrchestrator } from './system_orchestrator';

export async function executeFeedbackLoop(orchestrator: SystemOrchestrator, load: number) {
    // استخدام الوصول الآمن للحالة
    const state = orchestrator.state.getCurrent();
    await orchestrator.registry.dispatch('INNO_01', { 
        systemSnapshot: state || {} 
    });
}
