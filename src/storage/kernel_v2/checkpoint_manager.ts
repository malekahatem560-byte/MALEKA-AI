import { promises as fs } from 'fs';

export class CheckpointManager {
    constructor(private readonly checkpointPath: string) {}

    public async write(sequence: bigint): Promise<void> {
        const tmpPath = `${this.checkpointPath}.tmp`;
        const buffer = Buffer.alloc(8);
        buffer.writeBigUInt64LE(sequence);
        
        await fs.writeFile(tmpPath, buffer);
        await fs.rename(tmpPath, this.checkpointPath);
    }

    public async read(): Promise<bigint> {
        try {
            const buffer = await fs.readFile(this.checkpointPath);
            return buffer.readBigUInt64LE(0);
        } catch (err) {
            return 0n;
        }
    }
}
