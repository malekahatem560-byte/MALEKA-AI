"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextBuilder = void 0;
class ContextBuilder {
    build(source, content, metadata) {
        return {
            id: `ctx_${Date.now()}`,
            timestamp: Date.now(),
            source,
            content,
            metadata
        };
    }
}
exports.ContextBuilder = ContextBuilder;
