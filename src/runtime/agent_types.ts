export type AgentStatus = 'PENDING' | 'EXECUTING' | 'COMPLETED' | 'FAILED';
export interface AgentTask {
    id: string;
    agentId: string;
    payload: any;
    priority: number;
    retries: number;
}
