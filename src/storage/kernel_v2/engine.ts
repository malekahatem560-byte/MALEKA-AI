import { StorageKernelV2 } from './storage_kernel_v2';
import { PulseCoordinator } from './pulse_coordinator';
import { MeshSync } from './mesh_sync';

export class KernelEngine {
    private readonly kernel: StorageKernelV2;
    private readonly pulse = new PulseCoordinator();
    public readonly mesh = new MeshSync();

    constructor(baseDir: string) {
        this.kernel = new StorageKernelV2(baseDir);
    }

    public async boot(): Promise<void> {
        await this.kernel.initialize();
    }

    public async execute(data: Uint8Array, seq: bigint): Promise<void> {
        await this.kernel.store(data, seq);
        await this.mesh.broadcast(data);
    }
}
