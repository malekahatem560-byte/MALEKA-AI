import { StorageKernelV2 } from './kernel_v2/storage_kernel_v2';

export class StorageClient {
    private kernel: StorageKernelV2;

    constructor(baseDir: string) {
        this.kernel = new StorageKernelV2(baseDir);
    }

    public async connect(): Promise<void> {
        await this.kernel.init();
    }

    public async write(key: string, data: Uint8Array): Promise<void> {
        const seq = BigInt(Date.now());
        await this.kernel.store(data, seq);
    }

    public async snapshot(data: Uint8Array): Promise<void> {
        const seq = BigInt(Date.now());
        await this.kernel.saveSnapshot(seq, data);
    }

    public async getLatestSnapshot(): Promise<{ sequence: bigint; data: Uint8Array } | null> {
        return await this.kernel.loadSnapshot();
    }
}
