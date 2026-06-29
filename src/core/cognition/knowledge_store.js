"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeStore = void 0;
class KnowledgeStore {
    memory;
    episodic;
    constructor(memory, episodic) {
        this.memory = memory;
        this.episodic = episodic;
    }
    async store(record) {
        this.episodic.add(record);
        await this.memory.persist(record.id, record);
    }
    async remember(content) {
        const record = {
            id: `mem_${Date.now()}`,
            timestamp: Date.now(),
            content
        };
        await this.store(record);
        return record;
    }
    count() {
        return this.episodic.count();
    }
}
exports.KnowledgeStore = KnowledgeStore;
