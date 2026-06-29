"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MalekaEngine = void 0;
const storage_kernel_v2_1 = require("../storage/kernel_v2/storage_kernel_v2");
const event_bus_1 = require("./event_bus");
const runtime_manager_1 = require("../runtime/runtime_manager");
const agent_dispatcher_1 = require("../runtime/agent_dispatcher");
const system_orchestrator_1 = require("../agents/system_orchestrator");
const health_monitor_1 = require("./monitoring/health_monitor");
const permission_manager_1 = require("../security/permission_manager");
const studio_kernel_1 = require("../studio/core/studio_kernel");
const studio_integration_layer_1 = require("../studio/integration/studio_integration_layer");
const memory_manager_1 = require("./memory/memory_manager");
const global_cognitive_runtime_1 = require("./cognition/global_cognitive_runtime");
class MalekaEngine {
    runtime;
    bus;
    dispatcher;
    orchestrator;
    kernel;
    monitor;
    permissions;
    studio;
    studioIntegration;
    memoryManager;
    constructor() {
        this.bus = new event_bus_1.EventBus();
        this.kernel =
            new storage_kernel_v2_1.StorageKernelV2('./storage_data');
        this.memoryManager =
            new memory_manager_1.MemoryManager(this.kernel);
        global_cognitive_runtime_1.GlobalCognitiveRuntime.initialize(this.memoryManager);
        this.permissions =
            new permission_manager_1.PermissionManager();
        this.studio =
            new studio_kernel_1.StudioKernel();
        this.studioIntegration =
            new studio_integration_layer_1.StudioIntegrationLayer(this.studio, this.bus);
        this.studioIntegration.initialize();
        const agents = [
            'EXEC_01', 'OBS_01', 'STRAT_01', 'SEC_01', 'DIST_01',
            'PRED_V2_01', 'HEAL_01', 'INT_01', 'SYNC_01', 'AUDIT_01',
            'NET_01', 'CACHE_01', 'BUS_01', 'RES_01', 'GATE_01',
            'CFG_01', 'HLTH_01', 'DEPL_01', 'DL_01', 'INTEL_01',
            'SIM_01', 'DASH_01', 'COMP_01', 'SCALE_01', 'EXC_01',
            'CRYPT_01', 'SCHED_01', 'MEM_01', 'IDS_01', 'ECO_01',
            'PROTO_01', 'ASST_01', 'FED_01', 'RISK_01', 'PERF_01',
            'INNO_01'
        ];
        for (const agent of agents) {
            this.permissions.grant(agent, 'EXECUTE');
        }
        this.orchestrator =
            new system_orchestrator_1.SystemOrchestrator(this.kernel);
        this.dispatcher =
            new agent_dispatcher_1.AgentDispatcher(this.bus, this.orchestrator, this.permissions);
        this.monitor =
            new health_monitor_1.HealthMonitor(this.bus);
        this.runtime =
            new runtime_manager_1.RuntimeManager(this.dispatcher, this.bus);
    }
    async start() {
        await this.kernel.initialize();
        console.log('[BOOT] Storage Kernel Ready');
        this.runtime.start();
    }
    async bootstrap() {
        await this.start();
        console.log('[BOOT] Maleka Core Bootstrapped.');
    }
}
exports.MalekaEngine = MalekaEngine;
async function main() {
    const { MalekaEngine } = await Promise.resolve().then(() => __importStar(require('./maleka_engine')));
    const engine = new MalekaEngine();
    await engine.bootstrap();
}
main().catch((err) => {
    console.error('[FATAL]', err);
    process.exit(1);
});
