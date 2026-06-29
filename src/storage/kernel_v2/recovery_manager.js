"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryManager = void 0;
const wal_reader_1 = require("./wal_reader");
const retrieval_engine_1 = require("./retrieval_engine");
const fs_1 = require("fs");
const recovery_bridge_1 = require("../../core/cognition/recovery_bridge");
class RecoveryManager {
    logPath;
    reader;
    engine = new retrieval_engine_1.RetrievalEngine();
    constructor(logPath) {
        this.logPath = logPath;
        this.reader =
            new wal_reader_1.WALReader(this.logPath);
    }
    async recover(index) {
        if (!(0, fs_1.existsSync)(this.logPath)) {
            return;
        }
        try {
            const logs = this.reader.readAll();
            for await (const log of logs) {
                try {
                    const decrypted = await this.engine
                        .decryptAndDecompress(log.payload);
                    index.update(log.sequence, decrypted.length);
                    try {
                        const parsed = JSON.parse(Buffer
                            .from(decrypted)
                            .toString());
                        if (parsed &&
                            parsed.value &&
                            parsed.value.id &&
                            parsed.value.content) {
                            recovery_bridge_1.GlobalKnowledgeRecovery
                                .recoverRecord(parsed.value);
                        }
                    }
                    catch {
                    }
                }
                catch {
                    console.log('[Recovery] Skipping corrupted entry.');
                }
            }
        }
        catch {
            console.log('[Recovery] No logs to recover.');
        }
    }
}
exports.RecoveryManager = RecoveryManager;
