"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeRecovery = void 0;
class KnowledgeRecovery {
    episodic;
    constructor(episodic) {
        this.episodic = episodic;
    }
    recoverRecord(record) {
        this.episodic.add(record);
    }
}
exports.KnowledgeRecovery = KnowledgeRecovery;
