export type TaskType = 'DELAYED' | 'RECURRING';
export interface ScheduledTask {
    id: string;
    type: TaskType;
    action: () => Promise<void>;
    delay?: number;
    interval?: number;
}
