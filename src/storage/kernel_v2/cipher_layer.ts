import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

export class CipherLayer {
    private static readonly ALGO = 'aes-256-gcm';
    private readonly key = Buffer.from(process.env.MALEKA_KEY || '0123456789abcdef0123456789abcdef', 'utf8');

    public encrypt(data: Uint8Array): Uint8Array {
        const iv = randomBytes(12);
        const cipher = createCipheriv(CipherLayer.ALGO, this.key, iv);
        return Buffer.concat([iv, cipher.update(data), cipher.final(), cipher.getAuthTag()]);
    }

    public decrypt(encrypted: Uint8Array): Uint8Array {
        const iv = encrypted.subarray(0, 12);
        const tag = encrypted.subarray(encrypted.length - 16);
        const data = encrypted.subarray(12, encrypted.length - 16);
        const decipher = createDecipheriv(CipherLayer.ALGO, this.key, iv).setAuthTag(tag);
        return Buffer.concat([decipher.update(data), decipher.final()]);
    }
}
