"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalKnowledgeRecovery = exports.GlobalEpisodicMemory = void 0;
const episodic_memory_1 = require("./episodic_memory");
const knowledge_recovery_1 = require("./knowledge_recovery");
exports.GlobalEpisodicMemory = new episodic_memory_1.EpisodicMemory();
exports.GlobalKnowledgeRecovery = new knowledge_recovery_1.KnowledgeRecovery(exports.GlobalEpisodicMemory);
