"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddingService = void 0;
class EmbeddingService {
    async generate(text) {
        // محاكاة لعملية تحويل النص إلى متجه (Embedding)
        return text.split('').map(char => char.charCodeAt(0) / 255);
    }
}
exports.EmbeddingService = EmbeddingService;
