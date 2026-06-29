"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentDispatcher = void 0;
const execution_router_1 = require("./execution_router");
class AgentDispatcher {
    bus;
    orchestrator;
    permissions;
    constructor(bus, orchestrator, permissions) {
        this.bus = bus;
        this.orchestrator = orchestrator;
        this.permissions = permissions;
    }
    async dispatch(agentId, payload) {
        // نقطة مركزية لاحقاً للـ policy / routing / telemetry
        return await execution_router_1.ExecutionRouter.dispatch({
            agentId,
            payload
        });
    }
}
exports.AgentDispatcher = AgentDispatcher;
