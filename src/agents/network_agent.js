"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkAgent = void 0;
const base_agent_1 = require("./base_agent");
class NetworkAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'NETWORK');
    }
    async decide(task) {
        this.log(`NETWORK_IO: Transmitting to ${task.endpoint} - Size: ${task.data.length} bytes`);
    }
}
exports.NetworkAgent = NetworkAgent;
