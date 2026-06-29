import { promises as fs } from 'fs';
import { CRC32CValidator } from './crc32c_validator';
import { BinaryFrameDecoder } from './binary_frame_decoder';

export class WALReader {
private readonly decoder = new BinaryFrameDecoder();

constructor(private readonly logPath: string) {}

public async *readAll(): AsyncGenerator<
    { sequence: bigint; payload: Uint8Array },
    void,
    unknown
> {
    const handle = await fs.open(this.logPath, 'r');

    try {
        const stream = handle.readableWebStream();

        const iterable =
            stream as unknown as AsyncIterable<Uint8Array>;

        for await (const frame of this.decoder.decode(iterable)) {
            const view = new DataView(
                frame.payload.buffer,
                frame.payload.byteOffset,
                frame.payload.byteLength
            );

            const sequence = view.getBigUint64(0, true);
            const crc = view.getUint32(12, true);
            const data = frame.payload.subarray(16);

            if (CRC32CValidator.validate(data, crc)) {
                yield {
                    sequence,
                    payload: data
                };
            } else {
                console.log(
                    "[Recovery] CRC mismatch detected. Entry skipped."
                );
            }
        }
    } finally {
        try {
            await handle.close();
        } catch {}
    }
}

}
