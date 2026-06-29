import { Worker } from 'worker_threads';
import path from 'path';

type Task = {
  agentId: string;
  payload: any;
};

export class WorkerPool {
  private workers: Worker[] = [];
  private queue: Task[] = [];
  private maxWorkers: number;

  constructor(maxWorkers = 4) {
    this.maxWorkers = maxWorkers;
    this.init();
  }

  private init() {
    for (let i = 0; i < this.maxWorkers; i++) {
      const worker = new Worker(
        path.resolve(__dirname, './worker_thread.js')
      );

      worker.on('message', () => {
        const task = this.queue.shift();
        if (task) worker.postMessage(task);
      });

      this.workers.push(worker);
    }
  }

  public execute(task: Task) {
    this.queue.push(task);
    const worker = this.workers.find(w => w.threadId % this.maxWorkers === 0);
    if (worker) worker.postMessage(task);
  }

  public shutdown() {
    for (const w of this.workers) w.terminate();
  }
}
