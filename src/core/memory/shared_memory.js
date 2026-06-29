"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedMemory = void 0;
class SharedMemory {
    state = new Map();
    set(key, value) { this.state.set(key, value); }
    get(key) { return this.state.get(key); }
}
exports.SharedMemory = SharedMemory;
