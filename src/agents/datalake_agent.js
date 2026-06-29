"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataLakeAgent = void 0;
const base_agent_1 = require("./base_agent");
class DataLakeAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'DATALAKE');
    }
    async decide(task) {
        const dataId = task?.dataId ??
            `runtime-${Date.now()}`;
        this.log(`DATALAKE: Archiving dataset [${dataId}] to cold storage.`);
    }
}
exports.DataLakeAgent = DataLakeAgent;
