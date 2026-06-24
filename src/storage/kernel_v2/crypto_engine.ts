import * as crypto from 'crypto';

export class CryptoEngine {
    private readonly key = crypto.randomBytes(32); // مفتاح تشفير عشوائي للجلسة

    public encrypt(data: Uint8Array): Uint8Array {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-gcm', this.key, iv);
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        return Buffer.concat([iv, cipher.getAuthTag(), encrypted]);
    }
}
