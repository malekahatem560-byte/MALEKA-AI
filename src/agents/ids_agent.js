"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDSAgent = void 0;
const base_agent_1 = require("./base_agent");
class IDSAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'IDS');
    }
    async decide(task) {
        const source = task?.source ??
            'RUNTIME';
        const pattern = task?.pattern ??
            'HEARTBEAT';
        const isMalicious = pattern.includes('SQL_INJECTION') ||
            pattern.includes('DDoS');
        if (isMalicious) {
            this.log(`IDS: ALERT! Malicious activity detected from [${source}]. Isolating...`);
        }
        else {
            this.log(`IDS: Traffic from [${source}] verified as safe.`);
        }
    }
}
exports.IDSAgent = IDSAgent;
