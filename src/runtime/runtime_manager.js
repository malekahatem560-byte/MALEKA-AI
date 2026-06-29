"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeManager = void 0;
const runtime_loop_1 = require("./runtime_loop");
const task_scheduler_1 = require("./task_scheduler");
const worker_pool_1 = require("./sandbox/worker_pool");
const execution_router_1 = require("./execution_router");
class RuntimeManager {
    dispatcher;
    bus;
    running = false;
    loop;
    scheduler;
    pool;
    constructor(dispatcher, bus) {
        this.dispatcher = dispatcher;
        this.bus = bus;
        this.pool = new worker_pool_1.WorkerPool(4);
        execution_router_1.ExecutionRouter.init(this.pool);
        this.loop = new runtime_loop_1.RuntimeLoop(this.dispatcher, this.bus, { sample: () => ({ timestamp: Date.now(), cpuPercent: 0, memoryPercent: 0, memoryUsedMb: 0, systemLoad: 0 }) });
        this.scheduler = new task_scheduler_1.TaskScheduler();
    }
    start() {
        if (this.running)
            return;
        this.running = true;
        this.loop.start();
    }
}
exports.RuntimeManager = RuntimeManager;
