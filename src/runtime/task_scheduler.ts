import { ScheduledTask } from './task_types';

export class TaskScheduler {
    private tasks: ScheduledTask[] = [];

    public schedule(task: ScheduledTask): void {
        this.tasks.push(task);
        if (task.type === 'DELAYED' && task.delay) {
            setTimeout(task.action, task.delay);
        } else if (task.type === 'RECURRING' && task.interval) {
            setInterval(task.action, task.interval);
        }
    }
}
