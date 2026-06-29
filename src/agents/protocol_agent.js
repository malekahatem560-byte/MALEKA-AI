"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolAgent = void 0;
const base_agent_1 = require("./base_agent");
class ProtocolAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'PROTO_STD');
    }
    async decide(event) {
        this.log(`PROTO: Validating runtime payload at ${event?.timestamp ?? Date.now()}`);
    }
}
exports.ProtocolAgent = ProtocolAgent;
