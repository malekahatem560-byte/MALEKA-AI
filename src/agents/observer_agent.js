"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObserverAgent = void 0;
const base_agent_1 = require("./base_agent");
class ObserverAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'OBSERVER');
    }
    async decide(data) {
        this.log(`Observer Tick | load=${data.load}`);
        if (data.load > 80) {
            this.log("CRITICAL: High load detected!");
        }
    }
}
exports.ObserverAgent = ObserverAgent;
