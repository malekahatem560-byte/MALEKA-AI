"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WALWriter = void 0;
const promises_1 = require("fs/promises");
const cipher_layer_1 = require("./cipher_layer");
const crc32c_validator_1 = require("./crc32c_validator");
const binary_frame_encoder_1 = require("./binary_frame_encoder");
class WALWriter {
    path;
    checkpoint;
    handle = null;
    cipher = new cipher_layer_1.CipherLayer();
    encoder = new binary_frame_encoder_1.BinaryFrameEncoder();
    constructor(path, checkpoint) {
        this.path = path;
        this.checkpoint = checkpoint;
    }
    async open() {
        this.handle = await (0, promises_1.open)(this.path, 'a+');
    }
    async write(payload, sequence) {
        if (!this.handle) {
            throw new Error('WALWriter not initialized');
        }
        const encrypted = this.cipher.encrypt(payload);
        const crc = crc32c_validator_1.CRC32CValidator.calculate(encrypted);
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
    async close() {
        if (this.handle) {
            await this.handle.sync();
            await this.handle.close();
            this.handle = null;
        }
    }
}
exports.WALWriter = WALWriter;
