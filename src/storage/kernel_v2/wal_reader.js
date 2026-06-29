"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WALReader = void 0;
const fs_1 = require("fs");
const crc32c_validator_1 = require("./crc32c_validator");
const binary_frame_decoder_1 = require("./binary_frame_decoder");
class WALReader {
    logPath;
    decoder = new binary_frame_decoder_1.BinaryFrameDecoder();
    constructor(logPath) {
        this.logPath = logPath;
    }
    async *readAll() {
        const handle = await fs_1.promises.open(this.logPath, 'r');
        try {
            const stream = handle.readableWebStream();
            const iterable = stream;
            for await (const frame of this.decoder.decode(iterable)) {
                const view = new DataView(frame.payload.buffer, frame.payload.byteOffset, frame.payload.byteLength);
                const sequence = view.getBigUint64(0, true);
                const crc = view.getUint32(12, true);
                const data = frame.payload.subarray(16);
                if (crc32c_validator_1.CRC32CValidator.validate(data, crc)) {
                    yield {
                        sequence,
                        payload: data
                    };
                }
                else {
                    console.log("[Recovery] CRC mismatch detected. Entry skipped.");
                }
            }
        }
        finally {
            try {
                await handle.close();
            }
            catch { }
        }
    }
}
exports.WALReader = WALReader;
