export interface ExecutionNode {
  execute(agentId: string, payload: any): Promise<any>;
}
