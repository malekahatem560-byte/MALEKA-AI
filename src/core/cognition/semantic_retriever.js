"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemanticRetriever = void 0;
class SemanticRetriever {
    vectorStore;
    constructor(vectorStore) {
        this.vectorStore = vectorStore;
    }
    async search(query) {
        const result = await this.vectorStore.query(query);
        if (!result) {
            return [];
        }
        return [result];
    }
}
exports.SemanticRetriever = SemanticRetriever;
