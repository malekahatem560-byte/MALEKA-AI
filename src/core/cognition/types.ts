export interface CognitiveContext {
id: string;
timestamp: number;
source: string;
content: string;
metadata?: Record<string, any>;
}

export interface MemoryRecord {
id: string;
timestamp: number;
content: string;
embedding?: number[];
metadata?: Record<string, any>;
}

export interface ReasoningResult {
success: boolean;
confidence: number;
conclusion: string;
evidence: string[];
}

export interface PlanStep {
id: string;
description: string;
completed: boolean;
}

export interface CognitivePlan {
goal: string;
steps: PlanStep[];
}
