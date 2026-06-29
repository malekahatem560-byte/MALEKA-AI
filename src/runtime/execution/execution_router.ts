import { ExecutionContract, DispatchRequest } from './execution_contract';

export class ExecutionRouter {
  constructor(
    private registry: any,
    private bus: any,
    private workerPool: any
  ) {}

  async execute(req: DispatchRequest): Promise<any> {
    const task = ExecutionContract.normalize(req);

    switch (task.mode) {
      case 'sync':
        return this.registry.dispatch(task.agentId, task.payload);

      case 'event':
        this.bus.emit('dispatch', task);
        return;

      case 'worker':
        return this.workerPool.execute(task);

      default:
        throw new Error('Invalid dispatch mode');
    }
  }
}
