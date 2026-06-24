import { StorageKernelV2 } from './storage_kernel_v2';
import { PulseCoordinator } from './pulse_coordinator';
import { MeshSync } from './mesh_sync';
export class DataOrchestrator {
    constructor(private readonly kernel: StorageKernelV2, private readonly pulse: PulseCoordinator, private readonly mesh: MeshSync) {}
    public async processIncomingData(data: Uint8Array, sequence: bigint): Promise<void> {
        if (this.pulse.predictLoadRisk()) { await this.pulse.executePreemptiveMitigation(); }
        try { await this.kernel.store(data, sequence); await this.mesh.broadcast(data); }
        catch (err) { console.error("[Orchestrator] Transmission error:", err); }
    }
}
