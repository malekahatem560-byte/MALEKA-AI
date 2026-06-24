import { SharedMemory } from './shared_memory';
import { StorageKernelV2 } from '../../storage/kernel_v2/storage_kernel_v2';

export class MemoryManager {
    public shared: SharedMemory = new SharedMemory();
    constructor(private kernel: StorageKernelV2) {}
    
    public async persist(key: string, value: any) {
        // Using the appropriate kernel interface for persistence
        if (typeof (this.kernel as any).save === 'function') {
            await (this.kernel as any).save(`memory_${key}`, JSON.stringify(value));
        } else {
            // Fallback for current kernel implementation
            console.error("StorageKernelV2 interface mismatch: expected 'save' method.");
        }
    }
}
