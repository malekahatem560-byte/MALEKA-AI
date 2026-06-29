"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeLoop = void 0;
class RuntimeLoop {
    dispatcher;
    bus;
    resourceSampler;
    running = false;
    tickRate = 1000;
    cycleAgents = [
        'EXEC_01',
        'OBS_01', 'STRAT_01', 'SEC_01', 'PRED_V2_01', 'HEAL_01',
        'SYNC_01', 'AUDIT_01', 'CACHE_01', 'BUS_01', 'RES_01',
        'GATE_01', 'CFG_01', 'HLTH_01', 'DEPL_01', 'DL_01',
        'INTEL_01', 'SIM_01', 'DASH_01', 'COMP_01', 'SCALE_01',
        'EXC_01', 'SCHED_01', 'MEM_01', 'IDS_01', 'ECO_01',
        'PROTO_01', 'ASST_01', 'FED_01', 'RISK_01', 'PERF_01',
        'INNO_01'
    ];
    constructor(dispatcher, bus, resourceSampler = { sample: () => ({ timestamp: Date.now(), cpuPercent: 0, memoryPercent: 0, memoryUsedMb: 0, systemLoad: 0 }) }) {
        this.dispatcher = dispatcher;
        this.bus = bus;
        this.resourceSampler = resourceSampler;
    }
    async start() {
        if (this.running)
            return;
        if (this.running)
            return;
        this.running = true;
        while (this.running) {
            const metrics = this.resourceSampler.sample();
            this.bus.emit('SYSTEM_METRICS_UPDATED', metrics);
            const runtimeContext = {
                timestamp: metrics.timestamp,
                heartbeat: true,
                load: metrics.cpuPercent,
                memoryPercent: metrics.memoryPercent,
                memoryUsedMb: metrics.memoryUsedMb,
                systemLoad: metrics.systemLoad
            };
            const dispatchMap = {
                EXEC_01: {
                    data: Buffer.from(JSON.stringify(runtimeContext)),
                    seq: BigInt(Date.now())
                },
                OBS_01: runtimeContext,
                STRAT_01: runtimeContext,
                SEC_01: runtimeContext,
                PRED_V2_01: runtimeContext,
                HEAL_01: {
                    agentId: 'RUNTIME',
                    rootCause: 'NONE'
                },
                SYNC_01: runtimeContext,
                AUDIT_01: {
                    action: 'RUNTIME_TICK',
                    agentId: 'RUNTIME',
                    status: 'SUCCESS'
                },
                CACHE_01: {
                    key: 'runtime.load',
                    value: metrics.cpuPercent
                },
                BUS_01: {
                    event: 'RUNTIME_TICK',
                    payload: runtimeContext
                },
                RES_01: {
                    agentId: 'RUNTIME',
                    cpuUsage: metrics.cpuPercent,
                    ramUsage: metrics.memoryUsedMb
                },
                GATE_01: {
                    method: 'POST',
                    url: '/heartbeat',
                    payload: runtimeContext
                },
                CFG_01: {
                    key: 'runtime.load',
                    value: metrics.cpuPercent
                },
                HLTH_01: {
                    agentId: 'RUNTIME'
                },
                DEPL_01: {
                    version: 'runtime',
                    status: 'ACTIVE'
                },
                DL_01: {
                    dataId: `runtime-${Date.now()}`,
                    metadata: runtimeContext
                },
                INTEL_01: {
                    data: [
                        metrics.cpuPercent,
                        metrics.memoryPercent,
                        metrics.systemLoad
                    ]
                },
                SIM_01: {
                    scenario: 'RUNTIME_STABILITY',
                    intensity: metrics.cpuPercent
                },
                DASH_01: {
                    systemState: runtimeContext
                },
                COMP_01: {
                    action: 'RUNTIME_TICK',
                    agentId: 'RUNTIME'
                },
                SCALE_01: {
                    currentLoad: metrics.cpuPercent,
                    threshold: 80
                },
                EXC_01: {
                    error: 'NONE',
                    severity: 'LOW'
                },
                SCHED_01: {
                    taskName: 'heartbeat',
                    priority: 1
                },
                MEM_01: {
                    op: 'READ',
                    key: 'runtime.load'
                },
                IDS_01: {
                    source: 'RUNTIME',
                    pattern: 'HEARTBEAT'
                },
                ECO_01: {
                    load: metrics.cpuPercent
                },
                PROTO_01: {
                    message: JSON.stringify(runtimeContext),
                    protocol: 'RUNTIME_V1'
                },
                ASST_01: {
                    heartbeat: true,
                    load: metrics.cpuPercent,
                    timestamp: Date.now()
                },
                FED_01: {
                    modelId: 'runtime-model',
                    localGradients: {
                        load: metrics.cpuPercent
                    }
                },
                RISK_01: {
                    componentId: 'RUNTIME',
                    failureProbability: 0.01
                },
                PERF_01: {
                    sourceAgent: 'RUNTIME',
                    targetAgent: 'SYSTEM',
                    latency: 1
                },
                INNO_01: {
                    metrics: runtimeContext
                }
            };
            try {
                for (const agentId of this.cycleAgents) {
                    await this.dispatcher.dispatch(agentId, dispatchMap[agentId]);
                }
            }
            catch (err) {
                console.error('[RUNTIME ERROR]', err);
            }
            await new Promise(resolve => setTimeout(resolve, this.tickRate));
        }
    }
    stop() {
        this.running = false;
    }
}
exports.RuntimeLoop = RuntimeLoop;
