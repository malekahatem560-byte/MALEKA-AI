"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerSandbox = void 0;
const worker_threads_1 = require("worker_threads");
const path_1 = require("path");
class WorkerSandbox {
    static DEFAULT_TIMEOUT = 3000;
    static run(file, payload, timeout = WorkerSandbox.DEFAULT_TIMEOUT) {
        return new Promise((resolve, reject) => {
            const worker = new worker_threads_1.Worker((0, path_1.join)(process.cwd(), file), {
                workerData: payload
            });
            const timer = setTimeout(() => {
                worker.terminate();
                reject(new Error('[WORKER_SANDBOX] Timeout exceeded'));
            }, timeout);
            worker.on('message', (msg) => {
                clearTimeout(timer);
                resolve(msg);
            });
            worker.on('error', (err) => {
                clearTimeout(timer);
                reject(err);
            });
            worker.on('exit', (code) => {
                if (code !== 0) {
                    clearTimeout(timer);
                    reject(new Error(`[WORKER_SANDBOX] Exit code ${code}`));
                }
            });
        });
    }
}
exports.WorkerSandbox = WorkerSandbox;
