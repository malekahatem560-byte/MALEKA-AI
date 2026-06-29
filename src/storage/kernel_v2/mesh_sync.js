"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeshSync = void 0;
const crc32c_validator_1 = require("./crc32c_validator");
class MeshSync {
    validator = new crc32c_validator_1.CRC32CValidator();
    peers = [];
    async broadcast(payload) {
        const crc = this.validator.compute(payload);
        await Promise.all(this.peers.map(peer => this.transmit(peer, payload, crc)));
    }
    async transmit(peer, data, crc) {
        console.log(`[Mesh] Relaying to ${peer} | Integrity: ${crc.toString(16)}`);
    }
}
exports.MeshSync = MeshSync;
