"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoAgent = void 0;
const base_agent_1 = require("./base_agent");
class EcoAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'ECO_MODE');
    }
    async decide(task) {
        if (task.powerConsumption > 500) {
            this.log("ECO: High power usage. Throttling non-essential background tasks.");
        }
        else {
            this.log("ECO: Power consumption within optimal green parameters.");
        }
    }
}
exports.EcoAgent = EcoAgent;
