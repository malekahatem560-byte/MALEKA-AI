"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerPool = void 0;
const worker_threads_1 = require("worker_threads");
const path_1 = __importDefault(require("path"));
class WorkerPool {
    workers = [];
    queue = [];
    maxWorkers;
    constructor(maxWorkers = 4) {
        this.maxWorkers = maxWorkers;
        this.init();
    }
    init() {
        for (let i = 0; i < this.maxWorkers; i++) {
            const worker = new worker_threads_1.Worker(path_1.default.resolve(__dirname, './worker_thread.js'));
            worker.on('message', () => {
                const task = this.queue.shift();
                if (task)
                    worker.postMessage(task);
            });
            this.workers.push(worker);
        }
    }
    execute(task) {
        this.queue.push(task);
        const worker = this.workers.find(w => w.threadId % this.maxWorkers === 0);
        if (worker)
            worker.postMessage(task);
    }
    shutdown() {
        for (const w of this.workers)
            w.terminate();
    }
}
exports.WorkerPool = WorkerPool;
