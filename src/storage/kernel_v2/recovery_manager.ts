import { WALReader } from './wal_reader';
import { RetrievalEngine } from './retrieval_engine';
import { IndexManager } from './index_manager';
import { existsSync } from 'fs';

export class RecoveryManager {
    private readonly reader: WALReader;
    private readonly engine = new RetrievalEngine();

    constructor(private readonly logPath: string) {
        this.reader = new WALReader(this.logPath);
    }

    public async recover(index: IndexManager): Promise<void> {
        if (!existsSync(this.logPath)) return; // خروج آمن إذا لم يوجد ملف

        try {
            const logs = this.reader.readAll(); 
            for await (const log of logs) {
                try {
                    const decrypted = await this.engine.decryptAndDecompress(log.payload);
                    index.update(log.sequence, decrypted.length);
                } catch (e) {
                    console.error("[Recovery] Skipping corrupted entry.");
                }
            }
        } catch (e) {
            console.log("[Recovery] No logs to recover.");
        }
    }
}
