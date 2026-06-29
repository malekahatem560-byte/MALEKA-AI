"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageClient = void 0;
const storage_kernel_v2_1 = require("./kernel_v2/storage_kernel_v2");
class StorageClient {
    kernel;
    constructor(baseDir) {
        this.kernel = new storage_kernel_v2_1.StorageKernelV2(baseDir);
    }
    async connect() {
        await this.kernel.init();
    }
    async write(key, data) {
        const seq = BigInt(Date.now());
        await this.kernel.store(data, seq);
    }
    async snapshot(data) {
        const seq = BigInt(Date.now());
        await this.kernel.saveSnapshot(seq, data);
    }
    async getLatestSnapshot() {
        return await this.kernel.loadSnapshot();
    }
}
exports.StorageClient = StorageClient;
