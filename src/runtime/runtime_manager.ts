import { RuntimeLoop } from './runtime_loop';
import { TaskScheduler } from './task_scheduler';
import { AgentDispatcher } from './agent_dispatcher';
import { EventBus } from '../core/event_bus';

export class RuntimeManager {
    private loop: RuntimeLoop;
    private scheduler: TaskScheduler;

    constructor(private dispatcher: AgentDispatcher, private bus: EventBus) {
        this.loop = new RuntimeLoop(this.dispatcher, this.bus);
        this.scheduler = new TaskScheduler();
    }

    public start(): void {
        this.loop.start();
    }
}
