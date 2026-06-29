"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageKernelV2 = void 0;
const segment_manager_1 = require("./segment_manager");
const checkpoint_manager_1 = require("./checkpoint_manager");
const recovery_manager_1 = require("./recovery_manager");
const index_manager_1 = require("./index_manager");
const snapshot_store_1 = require("./snapshot_store");
const promises_1 = require("fs/promises");
class StorageKernelV2 {
    baseDir;
    segmentManager = null;
    checkpoint = null;
    index = new index_manager_1.IndexManager();
    snapshots = null;
    constructor(baseDir) {
        this.baseDir = baseDir;
    }
    async init() {
        await this.initialize();
    }
    async initialize() {
        await (0, promises_1.mkdir)(this.baseDir, { recursive: true });
        this.checkpoint = new checkpoint_manager_1.CheckpointManager(`${this.baseDir}/checkpoint.bin`);
        this.segmentManager = new segment_manager_1.SegmentManager(this.baseDir, this.checkpoint);
        this.snapshots = new snapshot_store_1.SnapshotStore(this.baseDir, this.checkpoint);
        const files = await (0, promises_1.readdir)(this.baseDir);
        const walFiles = files
            .filter(f => f.startsWith('seg_') && f.endsWith('.wal'))
            .sort();
        for (const wal of walFiles) {
            const recovery = new recovery_manager_1.RecoveryManager(`${this.baseDir}/${wal}`);
            await recovery.recover(this.index);
        }
        await this.snapshots.loadLatest();
        console.log('[Kernel] Recovery complete.');
        console.log('[Kernel] System initialized.');
    }
    async store(data, sequence) {
        if (!this.segmentManager) {
            throw new Error('Kernel not initialized');
        }
        await this.segmentManager.append(data, sequence);
        this.index.update(sequence, data.length);
    }
    async saveSnapshot(sequence, data) {
        if (!this.snapshots) {
            throw new Error('Kernel not initialized');
        }
        await this.snapshots.save(sequence, data);
    }
    async loadSnapshot() {
        if (!this.snapshots) {
            throw new Error('Kernel not initialized');
        }
        return await this.snapshots.loadLatest();
    }
    async autoOptimize() {
        console.log('[Kernel] Running autonomous optimization routines...');
    }
    async shutdown() {
        if (this.segmentManager) {
            await this.segmentManager.close();
        }
    }
}
exports.StorageKernelV2 = StorageKernelV2;
