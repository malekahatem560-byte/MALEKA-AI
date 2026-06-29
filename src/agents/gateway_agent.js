"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayAgent = void 0;
const base_agent_1 = require("./base_agent");
class GatewayAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'GATEWAY');
    }
    async decide(task) {
        const method = task?.method ?? 'RUNTIME';
        const url = task?.url ?? '/heartbeat';
        this.log(`GATEWAY: Routing ${method} request to ${url}`);
    }
}
exports.GatewayAgent = GatewayAgent;
