"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkingMemory = void 0;
class WorkingMemory {
    buffer = [];
    MAX_ITEMS = 100;
    add(context) {
        this.buffer.push(context);
        if (this.buffer.length >
            this.MAX_ITEMS) {
            this.buffer.shift();
        }
    }
    getAll() {
        return [...this.buffer];
    }
    clear() {
        this.buffer.length = 0;
    }
    size() {
        return this.buffer.length;
    }
}
exports.WorkingMemory = WorkingMemory;
