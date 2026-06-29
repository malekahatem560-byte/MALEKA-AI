"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReflectionEngine = void 0;
class ReflectionEngine {
    reflect(memories) {
        if (memories.length === 0) {
            return 'NO_MEMORY';
        }
        const latest = memories[memories.length - 1];
        return `REFLECTION:${latest.content}`;
    }
    score(memories) {
        if (memories.length === 0) {
            return 0;
        }
        return Math.min(1, memories.length / 100);
    }
}
exports.ReflectionEngine = ReflectionEngine;
