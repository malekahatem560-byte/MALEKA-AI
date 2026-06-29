import {
CognitiveContext,
MemoryRecord,
ReasoningResult,
CognitivePlan
} from './types';

export interface ICognitiveModule {
initialize(): Promise<void>;
}

export interface IMemoryRetriever {
retrieve(query: string): Promise<MemoryRecord[]>;
}

export interface ISemanticRetriever {
search(query: string): Promise<MemoryRecord[]>;
}

export interface IReasoningEngine {
reason(
context: CognitiveContext
): Promise<ReasoningResult>;
}

export interface IPlanner {
createPlan(
goal: string
): Promise<CognitivePlan>;
}
