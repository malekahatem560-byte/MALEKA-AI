import { WorkerPool } from "../sandbox/worker_pool";

export class LocalExecutionNode {
  private pool: WorkerPool;

  constructor() {
    this.pool = new WorkerPool(4)
  }

  public async execute(agentId: string, payload: any): Promise<any> {
    return this.pool.run(agentId, payload);
  }
}
