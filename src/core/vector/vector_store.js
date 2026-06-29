"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorStore = void 0;
class VectorStore {
    embeddingService;
    vectors = [];
    constructor(embeddingService) {
        this.embeddingService = embeddingService;
    }
    async store(data, text) {
        const embedding = await this.embeddingService.generate(text);
        this.vectors.push({ embedding, data });
    }
    async query(text) {
        // استرجاع دلالي مبسط
        return this.vectors[0]?.data || null;
    }
}
exports.VectorStore = VectorStore;
