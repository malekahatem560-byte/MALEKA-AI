export type ExecutionMode = 'sync' | 'worker' | 'event';

export interface DeterministicRequest {
  agentId: string;
  payload: any;
  timestamp: number;
}

export interface ExecutionPlan {
  mode: ExecutionMode;
  reason: string;
}
