import { MemoryRecord } from './types';

export interface LearningInsight {
id: string;
timestamp: number;
score: number;
summary: string;
}

export class LearningEngine {

private readonly insights: LearningInsight[] = [];

public learn(
memories: MemoryRecord[],
reflectionScore: number
): LearningInsight {

const summary =
memories.length > 0
? memories[memories.length - 1].content
: 'NO_DATA';

const insight: LearningInsight = {
id: `insight_${Date.now()}`,
timestamp: Date.now(),
score: reflectionScore,
summary
};

this.insights.push(
insight
);

return insight;

}

public getInsights(): LearningInsight[] {
return [...this.insights];
}

public count(): number {
return this.insights.length;
}

}
