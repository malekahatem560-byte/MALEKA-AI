import { promises as fs } from 'fs';
import * as path from 'path';
import { CheckpointManager } from './checkpoint_manager';

export class SnapshotStore {
    constructor(
        private readonly snapshotDir: string,
        private readonly checkpoint: CheckpointManager
    ) {}

    public async save(sequence: bigint, data: Uint8Array): Promise<void> {
        const filePath = path.join(this.snapshotDir, `snap_${sequence}.bin`);
        await fs.writeFile(filePath, data);
        await this.checkpoint.write(sequence);
    }

    public async loadLatest(): Promise<{ sequence: bigint; data: Uint8Array } | null> {
        const sequence = await this.checkpoint.read();
        if (sequence === 0n) return null;

        const filePath = path.join(this.snapshotDir, `snap_${sequence}.bin`);
        try {
            const data = await fs.readFile(filePath);
            return { sequence, data };
        } catch {
            return null;
        }
    }
}
