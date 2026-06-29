"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexManager = void 0;
class IndexManager {
    // تخزين العلاقة بين رقم التسلسل وموقعه في الملف
    index = new Map();
    currentOffset = 0;
    update(sequence, size) {
        this.index.set(sequence, this.currentOffset);
        this.currentOffset += size + 16; // 16 هو حجم الـ Header
    }
    getOffset(sequence) {
        return this.index.get(sequence);
    }
    clear() {
        this.index.clear();
        this.currentOffset = 0;
    }
}
exports.IndexManager = IndexManager;
