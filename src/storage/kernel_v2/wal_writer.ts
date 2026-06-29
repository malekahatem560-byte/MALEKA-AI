import { FileHandle, open } from 'fs/promises';
import { CheckpointManager } from './checkpoint_manager';
import { CipherLayer } from './cipher_layer';
import { CRC32CValidator } from './crc32c_validator';
import { BinaryFrameEncoder } from './binary_frame_encoder';

export class WALWriter {
private handle: FileHandle | null = null;
private readonly cipher = new CipherLayer();
private readonly encoder = new BinaryFrameEncoder();

constructor(
    private readonly path: string,
    private readonly checkpoint: CheckpointManager
) {}

public async open(): Promise<void> {
    this.handle = await open(this.path, 'a+');
}

public async write(payload: Uint8Array, sequence: bigint): Promise<void> {
    if (!this.handle) {
        throw new Error('WALWriter not initialized');
    }

    const encrypted = this.cipher.encrypt(payload);
    const crc = CRC32CValidator.calculate(encrypted);

    const record = Buffer.alloc(16 + encrypted.length);

    record.writeBigUInt64LE(sequence, 0);
    record.writeUInt32LE(encrypted.length, 8);
    record.writeUInt32LE(crc, 12);

    Buffer.from(encrypted).copy(record, 16);

    const frame = this.encoder.encode(record);

    await this.handle.write(frame);
    await this.handle.sync();

    await this.checkpoint.write(sequence);
}

public async close(): Promise<void> {
    if (this.handle) {
        await this.handle.sync();
        await this.handle.close();
        this.handle = null;
    }
}

}
