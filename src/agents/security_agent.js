"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityAgent = void 0;
const base_agent_1 = require("./base_agent");
class SecurityAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'SECURITY');
    }
    async decide(task) {
        const payload = typeof task?.payload === 'string'
            ? task.payload
            : JSON.stringify(task ?? {});
        this.log(`Scanning integrity for: ${payload}`);
        if (payload.includes('CRITICAL')) {
            this.log('ENCRYPTING: Security layer applied to high-risk packet.');
        }
    }
}
exports.SecurityAgent = SecurityAgent;
