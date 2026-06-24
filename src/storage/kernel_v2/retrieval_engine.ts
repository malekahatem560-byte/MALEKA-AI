import * as crypto from 'crypto';
import * as zlib from 'zlib';
import { promisify } from 'util';

const gunzip = promisify(zlib.gunzip);

export class RetrievalEngine {
    private readonly key = Buffer.alloc(32); // يجب أن يتطابق مع مفتاح التشفير

    public async decryptAndDecompress(data: Uint8Array): Promise<Uint8Array> {
        // 1. فك التشفير
        const iv = data.subarray(0, 16);
        const tag = data.subarray(16, 32);
        const encrypted = data.subarray(32);
        
        const decipher = crypto.createDecipheriv('aes-256-gcm', this.key, iv);
        decipher.setAuthTag(tag);
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

        // 2. فك الضغط (إذا تم ضغطها سابقاً)
        try {
            return await gunzip(decrypted);
        } catch {
            return decrypted; // عودة البيانات إذا لم تكن مضغوطة
        }
    }
}
