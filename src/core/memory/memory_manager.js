"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryManager = void 0;
const shared_memory_1 = require("./shared_memory");
class MemoryManager {
    kernel;
    shared = new shared_memory_1.SharedMemory();
    constructor(kernel) {
        this.kernel = kernel;
    }
    async persist(key, value) {
        const payload = Buffer.from(JSON.stringify({
            key,
            value,
            timestamp: Date.now()
        }));
        await this.kernel.store(payload, BigInt(Date.now()));
    }
}
exports.MemoryManager = MemoryManager;
