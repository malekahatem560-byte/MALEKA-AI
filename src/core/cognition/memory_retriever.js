"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryRetriever = void 0;
class MemoryRetriever {
    episodic;
    constructor(episodic) {
        this.episodic = episodic;
    }
    async retrieve(query) {
        const normalized = query.toLowerCase();
        return this.episodic
            .getAll()
            .filter(memory => memory.content
            .toLowerCase()
            .includes(normalized));
    }
}
exports.MemoryRetriever = MemoryRetriever;
