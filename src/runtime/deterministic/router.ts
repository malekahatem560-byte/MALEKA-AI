import { ExecutionPlanner } from './planner';
import { DeterministicRequest } from './types';

export class DeterministicRouter {
  constructor(
    private registry: any,
    private workerPool: any,
    private bus: any
  ) {}

  private planner = new ExecutionPlanner();

  async dispatch(req: DeterministicRequest): Promise<any> {
    const plan = this.planner.plan(req);

    switch (plan.mode) {
      case 'sync':
        return this.registry.dispatch(req.agentId, req.payload);

      case 'worker':
        return this.workerPool.execute(req);

      case 'event':
        this.bus.emit('dispatch', req);
        return;

      default:
        throw new Error('Invalid execution mode');
    }
  }
}
