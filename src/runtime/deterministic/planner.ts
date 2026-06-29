import { DeterministicRequest, ExecutionPlan } from './types';

export class ExecutionPlanner {
  plan(req: DeterministicRequest): ExecutionPlan {
    // PURE RULES ONLY (NO RANDOMNESS)

    const size = JSON.stringify(req.payload || {}).length;

    if (size < 2000) {
      return { mode: 'sync', reason: 'small payload deterministic sync execution' };
    }

    if (size < 20000) {
      return { mode: 'worker', reason: 'medium payload routed to worker isolation' };
    }

    return { mode: 'event', reason: 'large payload deferred event execution' };
  }
}
