"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskScheduler = void 0;
class TaskScheduler {
    tasks = [];
    schedule(task) {
        this.tasks.push(task);
        if (task.type === 'DELAYED' && task.delay) {
            setTimeout(task.action, task.delay);
        }
        else if (task.type === 'RECURRING' && task.interval) {
            setInterval(task.action, task.interval);
        }
    }
}
exports.TaskScheduler = TaskScheduler;
