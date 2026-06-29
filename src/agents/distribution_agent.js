"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributionAgent = void 0;
const base_agent_1 = require("./base_agent");
class DistributionAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'DISTRIBUTOR');
    }
    async decide(task) {
        this.log(`Distributing payload of size: ${task.data.length} bytes`);
        // منطق التوزيع عبر القنوات المحددة
    }
}
exports.DistributionAgent = DistributionAgent;
