"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployAgent = void 0;
const base_agent_1 = require("./base_agent");
class DeployAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'DEPLOY');
    }
    async decide(task) {
        const version = task?.version ?? 'runtime';
        const status = task?.status ?? 'ACTIVE';
        this.log(`DEPLOY: Initiating hot-swap for version: ${version}`);
        this.log(`DEPLOY: Deployment status: ${status}`);
    }
}
exports.DeployAgent = DeployAgent;
