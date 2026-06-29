"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionContract = void 0;
class ExecutionContract {
    static normalize(req) {
        return {
            agentId: req.agentId,
            payload: req.payload,
            mode: req.mode || 'sync'
        };
    }
}
exports.ExecutionContract = ExecutionContract;
