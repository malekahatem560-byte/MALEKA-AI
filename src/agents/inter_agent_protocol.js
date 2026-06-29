"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeFeedbackLoop = executeFeedbackLoop;
async function executeFeedbackLoop(orchestrator, load) {
    // استخدام الوصول الآمن للحالة
    const state = orchestrator.state.getCurrent();
    await orchestrator.registry.dispatch('INNO_01', {
        systemSnapshot: state || {}
    });
}
