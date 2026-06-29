"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerfMonitorAgent = void 0;
const base_agent_1 = require("./base_agent");
class PerfMonitorAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'PERF_MON');
    }
    async decide(task) {
        if (!task) {
            this.log('Invalid task payload');
            return;
        }
        if (task.latency > 100) {
            this.log(`PERF: High latency detected between [${task.sourceAgent}] and [${task.targetAgent}] : ${task.latency}ms`);
        }
        else {
            this.log(`PERF: Communication link [${task.sourceAgent}->${task.targetAgent}] is healthy.`);
        }
    }
}
exports.PerfMonitorAgent = PerfMonitorAgent;
