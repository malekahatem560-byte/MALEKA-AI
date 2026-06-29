"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderQueue = void 0;
class RenderQueue {
    queue = [];
    push(task) {
        this.queue.push(task);
    }
    size() {
        return this.queue.length;
    }
    all() {
        return this.queue;
    }
}
exports.RenderQueue = RenderQueue;
