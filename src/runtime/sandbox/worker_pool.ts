import { Worker } from 'worker_threads';
import path from 'path';

type Task = {
  agentId: string;
  payload: any;
};

export class WorkerPool {
  private workers: Worker[] = [];

  constructor(size = 4) {
    for (let i = 0; i < size; i++) {
      const worker = new Worker(
        path.resolve(__dirname, '../worker_pool/worker_thread.js')
      );
      this.workers.push(worker);
    }
  }

  public async execute(task: Task): Promise<any> {
    return new Promise((resolve) => {
      const worker = this.workers[
        Math.floor(Math.random() * this.workers.length)
      ];

      const handler = (msg: any) => {
        worker.off('message', handler);
        resolve(msg);
      };

      worker.on('message', handler);
      worker.postMessage(task);
    });
  }

  public run(agentId: string, payload: any): Promise<any> {
    return this.execute({ agentId, payload });
  }
}
