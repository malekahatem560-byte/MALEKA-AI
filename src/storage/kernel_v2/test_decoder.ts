import { BinaryFrameDecoder } from './binary_frame_decoder';
import { Readable } from 'stream';

async function run() {
    const decoder = new BinaryFrameDecoder();
    // Simulate: Header [5,0,0,0] + "HELLO" (5 bytes)
    const data = Buffer.concat([Buffer.from([5,0,0,0]), Buffer.from("HELLO")]);
    const stream = Readable.from([data]);

    for await (const frame of decoder.decode(stream)) {
        if (Buffer.from(frame.payload).toString() === "HELLO") {
            process.exit(0);
        }
    }
    process.exit(1);
}
run();
