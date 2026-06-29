"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictiveAgentV2 = void 0;
const base_agent_1 = require("./base_agent");
class PredictiveAgentV2 extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'PREDICTIVE_V2');
    }
    history = [];
    async decide(task) {
        const load = typeof task?.load === 'number'
            ? task.load
            : 0;
        this.history.push(load);
        if (this.history.length > 50) {
            this.history.shift();
        }
        const avg = this.history.reduce((a, b) => a + b, 0) /
            this.history.length;
        this.log(`PREDICTIVE_V2: Trend=${avg > 70 ? 'CRITICAL_SPIKE' : 'STABLE'} | AvgLoad=${avg.toFixed(2)}`);
    }
}
exports.PredictiveAgentV2 = PredictiveAgentV2;
