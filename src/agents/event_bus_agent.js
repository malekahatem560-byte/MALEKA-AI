"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBusAgent = void 0;
const base_agent_1 = require("./base_agent");
class EventBusAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'EVENT_BUS');
    }
    async decide(event) {
        const eventType = event?.type ??
            'RUNTIME_TICK';
        const payload = event?.payload ??
            event;
        const payloadSize = JSON.stringify(payload ?? {}).length;
        this.log(`EVENT_BUS: Routing event [${eventType}] with payload size: ${payloadSize} bytes`);
    }
}
exports.EventBusAgent = EventBusAgent;
