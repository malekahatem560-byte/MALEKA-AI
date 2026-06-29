"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategistAgent = void 0;
const base_agent_1 = require("./base_agent");
class StrategistAgent extends base_agent_1.BaseAgent {
    constructor(id) { super(id, 'STRATEGIST'); }
    async decide(context) {
        if (context.load > 70)
            this.log("DECISION: Scaling performance for high load.");
        else
            this.log("DECISION: Optimal state maintained.");
    }
}
exports.StrategistAgent = StrategistAgent;
