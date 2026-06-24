import { promises as fs } from 'fs';
import * as path from 'path';
import { WALWriter } from './wal_writer';
import { CheckpointManager } from './checkpoint_manager';

export class SegmentManager {
    private currentWriter: WALWriter | null = null;
    private readonly MAX_SEGMENT_SIZE = 128 * 1024 * 1024; // 128MB
    private currentSize = 0;

    constructor(
        private readonly storageDir: string,
        private readonly checkpoint: CheckpointManager
    ) {}

    public async append(payload: Uint8Array, sequence: bigint): Promise<void> {
        if (!this.currentWriter || this.currentSize >= this.MAX_SEGMENT_SIZE) {
            await this.rotate();
        }
        await this.currentWriter!.write(payload, sequence);
        this.currentSize += payload.length + 16;
    }

    private async rotate(): Promise<void> {
        if (this.currentWriter) await this.currentWriter.close();

        const segmentId = Date.now();
        const filePath = path.join(this.storageDir, `seg_${segmentId}.wal`);

        this.currentWriter = new WALWriter(filePath, this.checkpoint);
        await this.currentWriter.open();
        this.currentSize = 0;
    }

    public async close(): Promise<void> {
        if (this.currentWriter) await this.currentWriter.close();
    }
}
