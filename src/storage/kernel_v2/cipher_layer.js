"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CipherLayer = void 0;
const crypto_1 = require("crypto");
class CipherLayer {
    static ALGO = 'aes-256-gcm';
    key = Buffer.from(process.env.MALEKA_KEY || '0123456789abcdef0123456789abcdef', 'utf8');
    encrypt(data) {
        const iv = (0, crypto_1.randomBytes)(12);
        const cipher = (0, crypto_1.createCipheriv)(CipherLayer.ALGO, this.key, iv);
        return Buffer.concat([iv, cipher.update(data), cipher.final(), cipher.getAuthTag()]);
    }
    decrypt(encrypted) {
        const iv = encrypted.subarray(0, 12);
        const tag = encrypted.subarray(encrypted.length - 16);
        const data = encrypted.subarray(12, encrypted.length - 16);
        const decipher = (0, crypto_1.createDecipheriv)(CipherLayer.ALGO, this.key, iv).setAuthTag(tag);
        return Buffer.concat([decipher.update(data), decipher.final()]);
    }
}
exports.CipherLayer = CipherLayer;
