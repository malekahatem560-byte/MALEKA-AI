"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardAgent = void 0;
const base_agent_1 = require("./base_agent");
class DashboardAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'DASHBOARD');
    }
    async decide(task) {
        const state = task?.systemState ??
            task ??
            {};
        const cpu = state.cpuPercent ??
            state.load ??
            state.cpuUsage ??
            0;
        const ram = state.memoryPercent ??
            0;
        this.log(`CPU=${cpu}% RAM=${ram}%`);
    }
}
exports.DashboardAgent = DashboardAgent;
