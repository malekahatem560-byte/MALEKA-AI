import { WorkerPool } from './sandbox/worker_pool';

export type ExecutionTask = {
  agentId: string;
  payload: any;
};

export class ExecutionRouter {
  private static pool: WorkerPool | null = null;

  public static init(pool: WorkerPool) {
    this.pool = pool;
  }

  /**
   * Single deterministic execution entry point
   */
  public static async dispatch(task: ExecutionTask): Promise<any> {
    if (!this.pool) {
      throw new Error('[ExecutionRouter] WorkerPool not initialized');
    }

    return await this.pool.execute(task);
  }
}
