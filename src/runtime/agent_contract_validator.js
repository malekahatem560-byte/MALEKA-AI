"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentContractValidator = void 0;
class AgentContractValidator {
    static contracts = {
        HEAL_01: ['agentId', 'rootCause'],
        AUDIT_01: ['action', 'agentId', 'status'],
        CACHE_01: ['key'],
        BUS_01: ['event', 'payload'],
        RES_01: ['agentId', 'cpuUsage', 'ramUsage'],
        GATE_01: ['method', 'url', 'payload'],
        CFG_01: ['key', 'value'],
        HLTH_01: ['agentId'],
        DEPL_01: ['version', 'status'],
        DL_01: ['dataId', 'metadata'],
        INTEL_01: ['data'],
        SIM_01: ['scenario', 'intensity'],
        DASH_01: ['systemState'],
        COMP_01: ['action', 'agentId'],
        SCALE_01: ['currentLoad', 'threshold'],
        EXC_01: ['error', 'severity'],
        SCHED_01: ['taskName', 'priority'],
        MEM_01: ['op', 'key'],
        IDS_01: ['source', 'pattern'],
        ECO_01: ['load'],
        PROTO_01: ['message', 'protocol'],
        ASST_01: ['heartbeat', 'load', 'timestamp'],
        FED_01: ['modelId', 'localGradients'],
        RISK_01: ['componentId', 'failureProbability'],
        PERF_01: ['sourceAgent', 'targetAgent', 'latency'],
        INNO_01: ['metrics']
    };
    static validate(agentId, payload) {
        const contract = this.contracts[agentId];
        if (!contract)
            return true;
        if (!payload)
            return false;
        return contract.every(field => Object.prototype.hasOwnProperty.call(payload, field));
    }
}
exports.AgentContractValidator = AgentContractValidator;
