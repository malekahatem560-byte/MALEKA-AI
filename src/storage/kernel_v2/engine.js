"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KernelEngine = void 0;
const storage_kernel_v2_1 = require("./storage_kernel_v2");
const pulse_coordinator_1 = require("./pulse_coordinator");
const mesh_sync_1 = require("./mesh_sync");
class KernelEngine {
    kernel;
    pulse = new pulse_coordinator_1.PulseCoordinator();
    mesh = new mesh_sync_1.MeshSync();
    constructor(baseDir) {
        this.kernel = new storage_kernel_v2_1.StorageKernelV2(baseDir);
    }
    async boot() {
        await this.kernel.initialize();
    }
    async execute(data, seq) {
        await this.kernel.store(data, seq);
        await this.mesh.broadcast(data);
    }
}
exports.KernelEngine = KernelEngine;
