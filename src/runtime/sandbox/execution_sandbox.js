"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionSandbox = void 0;
class ExecutionSandbox {
    static DEFAULT_TIMEOUT = 2000;
    static async run(fn, timeout = ExecutionSandbox.DEFAULT_TIMEOUT) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error('[SANDBOX] Execution timeout exceeded'));
            }, timeout);
            fn()
                .then((result) => {
                clearTimeout(timer);
                resolve(result);
            })
                .catch((err) => {
                clearTimeout(timer);
                reject(err);
            });
        });
    }
}
exports.ExecutionSandbox = ExecutionSandbox;
