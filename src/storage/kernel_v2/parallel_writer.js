"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParallelWriter = void 0;
const adaptive_compressor_1 = require("./adaptive_compressor");
class ParallelWriter {
    writer;
    compressor = new adaptive_compressor_1.AdaptiveCompressor();
    constructor(writer) {
        this.writer = writer;
    }
    async enqueue(payload, sequence) {
        const compressed = this.compressor.compress(payload);
        await this.writer.write(compressed, sequence);
    }
}
exports.ParallelWriter = ParallelWriter;
