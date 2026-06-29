"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodicMemory = void 0;
class EpisodicMemory {
    memories = [];
    add(memory) {
        this.memories.push(memory);
    }
    getAll() {
        return [...this.memories];
    }
    getLatest(limit = 10) {
        return this.memories.slice(-limit);
    }
    count() {
        return this.memories.length;
    }
    clear() {
        this.memories.length = 0;
    }
}
exports.EpisodicMemory = EpisodicMemory;
