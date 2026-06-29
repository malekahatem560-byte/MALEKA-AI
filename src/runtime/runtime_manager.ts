import { RuntimeLoop } from './runtime_loop';
import { TaskScheduler } from './task_scheduler';
import { EventBus } from '../core/event_bus';
import { WorkerPool } from './sandbox/worker_pool';
import { ExecutionRouter } from './execution_router';
import { AgentDispatcher } from './agent_dispatcher';

export class RuntimeManager {
  private running = false;
  private loop: RuntimeLoop;
  private scheduler: TaskScheduler;
  private pool: WorkerPool;

  constructor(
    private dispatcher: AgentDispatcher,
    private bus: EventBus
  ) {
    this.pool = new WorkerPool(4);
    ExecutionRouter.init(this.pool);

    this.loop = new RuntimeLoop(
      this.dispatcher,
      this.bus,
      { sample: () => ({ timestamp: Date.now(), cpuPercent: 0, memoryPercent: 0, memoryUsedMb: 0, systemLoad: 0 }) }
    );

    this.scheduler = new TaskScheduler();
  }

  public start(): void {
    if (this.running) return;
    this.running = true;
    this.loop.start();
  }
}
