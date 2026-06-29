"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncAgent = void 0;
const base_agent_1 = require("./base_agent");
class SyncAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'SYNC');
    }
    async decide(status) {
        const timestamp = typeof status?.timestamp === 'number'
            ? status.timestamp
            : Date.now();
        const activeAgents = Array.isArray(status?.activeAgents)
            ? status.activeAgents
            : [];
        this.log(`Synchronizing state at ${timestamp}`);
        if (activeAgents.length > 0) {
            this.log(`Active coordination points: ${activeAgents.join(', ')}`);
        }
        else {
            this.log('Active coordination points: none');
        }
    }
}
exports.SyncAgent = SyncAgent;
