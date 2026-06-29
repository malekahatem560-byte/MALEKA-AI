"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictiveAgent = void 0;
const base_agent_1 = require("./base_agent");
class PredictiveAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'PREDICTIVE');
    }
    async decide(history) {
        const avg = history.loads.reduce((a, b) => a + b, 0) / history.loads.length;
        this.log(`Trend analysis: Average load projected at ${avg.toFixed(2)}%`);
        if (avg > 60) {
            this.log("PREDICTION: System load increasing. Pre-emptive scaling advised.");
        }
    }
}
exports.PredictiveAgent = PredictiveAgent;
