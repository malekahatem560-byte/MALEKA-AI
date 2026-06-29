"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShardManager = void 0;
class ShardManager {
    shards = new Map();
    getWriter(sequence) {
        const shardId = Number(sequence % 4n);
        return this.shards.get(shardId);
    }
}
exports.ShardManager = ShardManager;
