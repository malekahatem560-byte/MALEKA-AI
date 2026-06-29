import { SharedMemory } from './shared_memory';
import { StorageKernelV2 } from '../../storage/kernel_v2/storage_kernel_v2';

export class MemoryManager {

public shared: SharedMemory = new SharedMemory();

constructor(
    private kernel: StorageKernelV2
) {}

public async persist(
    key: string,
    value: any
): Promise<void> {

    const payload =
        Buffer.from(
            JSON.stringify({
                key,
                value,
                timestamp: Date.now()
            })
        );

    await this.kernel.store(
        payload,
        BigInt(Date.now())
    );
}

}
