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
    constructor(size = 4) {
        for (let i = 0; i < size; i++) {
            const worker = new worker_threads_1.Worker(path_1.default.resolve(__dirname, '../worker_pool/worker_thread.js'));
            this.workers.push(worker);
        }
    }
    async execute(task) {
        return new Promise((resolve) => {
            const worker = this.workers[Math.floor(Math.random() * this.workers.length)];
            const handler = (msg) => {
                worker.off('message', handler);
                resolve(msg);
            };
            worker.on('message', handler);
            worker.postMessage(task);
        });
    }
    run(agentId, payload) {
        return this.execute({ agentId, payload });
    }
}
exports.WorkerPool = WorkerPool;
