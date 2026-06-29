export type DispatchMode = 'sync' | 'event' | 'worker';

export interface DispatchRequest {
  agentId: string;
  payload: any;
  mode?: DispatchMode;
}

export class ExecutionContract {
  static normalize(req: DispatchRequest): Required<DispatchRequest> {
    return {
      agentId: req.agentId,
      payload: req.payload,
      mode: req.mode || 'sync'
    };
  }
}
