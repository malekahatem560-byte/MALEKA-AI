"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_frame_decoder_1 = require("./binary_frame_decoder");
const stream_1 = require("stream");
async function run() {
    const decoder = new binary_frame_decoder_1.BinaryFrameDecoder();
    // Simulate: Header [5,0,0,0] + "HELLO" (5 bytes)
    const data = Buffer.concat([Buffer.from([5, 0, 0, 0]), Buffer.from("HELLO")]);
    const stream = stream_1.Readable.from([data]);
    for await (const frame of decoder.decode(stream)) {
        if (Buffer.from(frame.payload).toString() === "HELLO") {
            process.exit(0);
        }
    }
    process.exit(1);
}
run();
