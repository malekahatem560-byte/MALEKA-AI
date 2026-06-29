import { SegmentManager } from './segment_manager';
import { CheckpointManager } from './checkpoint_manager';
import { RecoveryManager } from './recovery_manager';
import { IndexManager } from './index_manager';
import { SnapshotStore } from './snapshot_store';
import { mkdir, readdir } from 'fs/promises';

export class StorageKernelV2 {
private segmentManager: SegmentManager | null = null;
private checkpoint: CheckpointManager | null = null;
private index: IndexManager = new IndexManager();
private snapshots: SnapshotStore | null = null;

constructor(private readonly baseDir: string) {}

public async init(): Promise<void> {
    await this.initialize();
}

public async initialize(): Promise<void> {
    await mkdir(this.baseDir, { recursive: true });

    this.checkpoint = new CheckpointManager(
        `${this.baseDir}/checkpoint.bin`
    );

    this.segmentManager = new SegmentManager(
        this.baseDir,
        this.checkpoint
    );

    this.snapshots = new SnapshotStore(
        this.baseDir,
        this.checkpoint
    );

    const files = await readdir(this.baseDir);

    const walFiles = files
        .filter(f => f.startsWith('seg_') && f.endsWith('.wal'))
        .sort();

    for (const wal of walFiles) {
        const recovery = new RecoveryManager(
            `${this.baseDir}/${wal}`
        );

        await recovery.recover(this.index);
    }

    await this.snapshots.loadLatest();

    console.log('[Kernel] Recovery complete.');
    console.log('[Kernel] System initialized.');
}

public async store(
    data: Uint8Array,
    sequence: bigint
): Promise<void> {
    if (!this.segmentManager) {
        throw new Error('Kernel not initialized');
    }

    await this.segmentManager.append(
        data,
        sequence
    );

    this.index.update(
        sequence,
        data.length
    );
}

public async saveSnapshot(
    sequence: bigint,
    data: Uint8Array
): Promise<void> {
    if (!this.snapshots) {
        throw new Error('Kernel not initialized');
    }

    await this.snapshots.save(
        sequence,
        data
    );
}

public async loadSnapshot(): Promise<{
    sequence: bigint;
    data: Uint8Array;
} | null> {
    if (!this.snapshots) {
        throw new Error('Kernel not initialized');
    }

    return await this.snapshots.loadLatest();
}

public async autoOptimize(): Promise<void> {
    console.log('[Kernel] Running autonomous optimization routines...');
}


public async shutdown(): Promise<void> {
    if (this.segmentManager) {
        await this.segmentManager.close();
    }
}

}
