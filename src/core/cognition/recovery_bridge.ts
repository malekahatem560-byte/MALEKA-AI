import { EpisodicMemory } from './episodic_memory';
import { KnowledgeRecovery } from './knowledge_recovery';

export const GlobalEpisodicMemory =
new EpisodicMemory();

export const GlobalKnowledgeRecovery =
new KnowledgeRecovery(
GlobalEpisodicMemory
);
