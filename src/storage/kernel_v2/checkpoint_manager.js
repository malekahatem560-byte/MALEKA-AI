"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckpointManager = void 0;
const fs_1 = require("fs");
class CheckpointManager {
    checkpointPath;
    constructor(checkpointPath) {
        this.checkpointPath = checkpointPath;
    }
    async write(sequence) {
        const tmpPath = `${this.checkpointPath}.tmp`;
        const buffer = Buffer.alloc(8);
        buffer.writeBigUInt64LE(sequence);
        await fs_1.promises.writeFile(tmpPath, buffer);
        await fs_1.promises.rename(tmpPath, this.checkpointPath);
    }
    async read() {
        try {
            const buffer = await fs_1.promises.readFile(this.checkpointPath);
            return buffer.readBigUInt64LE(0);
        }
        catch (err) {
            return 0n;
        }
    }
}
exports.CheckpointManager = CheckpointManager;
