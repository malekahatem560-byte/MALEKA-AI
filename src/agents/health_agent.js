"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthAgent = void 0;
const base_agent_1 = require("./base_agent");
class HealthAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'HEALTH');
    }
    async decide(task) {
        if (!task) {
            this.log('Invalid task payload');
            return;
        }
        this.log(`HEALTH_CHECK: Pinging agent ${task.agentId}...`);
        this.log(`HEALTH_CHECK: Agent ${task.agentId} is RESPONSIVE.`);
    }
}
exports.HealthAgent = HealthAgent;
