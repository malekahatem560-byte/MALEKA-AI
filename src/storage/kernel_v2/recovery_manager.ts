import { WALReader } from './wal_reader';
import { RetrievalEngine } from './retrieval_engine';
import { IndexManager } from './index_manager';
import { existsSync } from 'fs';

import {
GlobalKnowledgeRecovery
} from '../../core/cognition/recovery_bridge';

export class RecoveryManager {

private readonly reader: WALReader;

private readonly engine =
new RetrievalEngine();

constructor(
private readonly logPath: string
) {
this.reader =
new WALReader(
this.logPath
);
}

public async recover(
index: IndexManager
): Promise<void> {

if (
    !existsSync(
        this.logPath
    )
) {
    return;
}

try {

    const logs =
        this.reader.readAll();

    for await (
        const log of logs
    ) {

        try {

            const decrypted =
                await this.engine
                    .decryptAndDecompress(
                        log.payload
                    );

            index.update(
                log.sequence,
                decrypted.length
            );

            try {

                const parsed =
                    JSON.parse(
                        Buffer
                            .from(
                                decrypted
                            )
                            .toString()
                    );

                if (
                    parsed &&
                    parsed.value &&
                    parsed.value.id &&
                    parsed.value.content
                ) {

                    GlobalKnowledgeRecovery
                        .recoverRecord(
                            parsed.value
                        );

                }

            } catch {

            }

        } catch {

            console.log(
                '[Recovery] Skipping corrupted entry.'
            );

        }

    }

} catch {

    console.log(
        '[Recovery] No logs to recover.'
    );

}

}

}
