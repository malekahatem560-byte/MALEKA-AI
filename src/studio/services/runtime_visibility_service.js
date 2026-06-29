"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeVisibilityService = void 0;
class RuntimeVisibilityService {
    registry;
    constructor(registry) {
        this.registry = registry;
    }
    snapshot() {
        return {
            totalAgents: this.registry.count(),
            agentIds: this.registry.getAgentIds(),
            timestamp: Date.now()
        };
    }
}
exports.RuntimeVisibilityService = RuntimeVisibilityService;
