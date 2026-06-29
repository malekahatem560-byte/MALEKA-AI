"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataOrchestrator = void 0;
class DataOrchestrator {
    kernel;
    pulse;
    mesh;
    constructor(kernel, pulse, mesh) {
        this.kernel = kernel;
        this.pulse = pulse;
        this.mesh = mesh;
    }
    async processIncomingData(data, sequence) {
        if (this.pulse.predictLoadRisk()) {
            await this.pulse.executePreemptiveMitigation();
        }
        try {
            await this.kernel.store(data, sequence);
            await this.mesh.broadcast(data);
        }
        catch (err) {
            console.error("[Orchestrator] Transmission error:", err);
        }
    }
}
exports.DataOrchestrator = DataOrchestrator;
