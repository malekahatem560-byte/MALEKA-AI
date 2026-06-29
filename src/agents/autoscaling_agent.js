"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoScalingAgent = void 0;
const base_agent_1 = require("./base_agent");
class AutoScalingAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'AUTOSCALING');
    }
    async decide(task) {
        if (task.currentLoad > task.threshold) {
            this.log("AUTOSCALING: Load threshold exceeded. Provisioning new worker agents...");
        }
        else {
            this.log("AUTOSCALING: Load stable. Optimizing existing resources.");
        }
    }
}
exports.AutoScalingAgent = AutoScalingAgent;
