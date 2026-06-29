"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditAgent = void 0;
const base_agent_1 = require("./base_agent");
class AuditAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'AUDIT');
    }
    async decide(event) {
        this.log(`AUDIT_LOG: [${event.action}] by [${event.agentId}] - Status: ${event.status}`);
    }
}
exports.AuditAgent = AuditAgent;
