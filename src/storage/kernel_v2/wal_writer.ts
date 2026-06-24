import { FileHandle, open } from 'fs/promises';
import { CheckpointManager } from './checkpoint_manager';
import { CipherLayer } from './cipher_layer';
import { CRC32CValidator } from './crc32c_validator';

export class WALWriter {
    private handle: FileHandle | null = null;
    private readonly cipher = new CipherLayer();
    private readonly validator = new CRC32CValidator();

    constructor(private readonly path: string, private readonly checkpoint: CheckpointManager) {}

    public async open(): Promise<void> {
        this.handle = await open(this.path, 'a+');
    }

    public async write(payload: Uint8Array, sequence: bigint): Promise<void> {
        if (!this.handle) throw new Error("WALWriter not initialized");
        const encrypted = this.cipher.encrypt(payload);
        const crc = this.validator.compute(encrypted);
        const header = Buffer.alloc(16);
        header.writeBigUInt64LE(sequence, 0);
        header.writeUInt32LE(encrypted.length, 8);
        header.writeUInt32LE(crc, 12);
        await this.handle.writev([header, encrypted]);
        await this.handle.sync();
    }

    public async close(): Promise<void> {
        if (this.handle) {
            await this.handle.sync();
            await this.handle.close();
            this.handle = null;
        }
    }
}
