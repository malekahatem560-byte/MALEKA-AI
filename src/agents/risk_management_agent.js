"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiskManagementAgent = void 0;
const base_agent_1 = require("./base_agent");
class RiskManagementAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'RISK_MGMT');
    }
    async decide(task) {
        if (!task) {
            this.log('Invalid task payload');
            return;
        }
        if (task.failureProbability > 0.5) {
            this.log(`RISK: HIGH RISK detected for ${task.componentId}`);
        }
        else {
            this.log(`RISK: ${task.componentId} operating within safety parameters.`);
        }
    }
}
exports.RiskManagementAgent = RiskManagementAgent;
