"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceAgent = void 0;
const base_agent_1 = require("./base_agent");
class ResourceAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'RESOURCE');
    }
    async decide(task) {
        const agentId = task?.agentId ?? 'RUNTIME';
        const cpuUsage = task?.cpuUsage ?? task?.load ?? 0;
        const ramUsage = task?.ramUsage ?? 0;
        this.log(`RESOURCE: Monitoring ${agentId} - CPU: ${cpuUsage}%, RAM: ${ramUsage}MB`);
        if (cpuUsage > 80) {
            this.log(`ALERT: High pressure on ${agentId}. Scaling resources.`);
        }
    }
}
exports.ResourceAgent = ResourceAgent;
