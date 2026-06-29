import * as zlib from 'zlib';
import { promisify } from 'util';
import { CipherLayer } from './cipher_layer';

const gunzip = promisify(zlib.gunzip);

export class RetrievalEngine {
private readonly cipher = new CipherLayer();

public async decryptAndDecompress(
    data: Uint8Array
): Promise<Uint8Array> {
    const decrypted = this.cipher.decrypt(data);

    try {
        return await gunzip(decrypted);
    } catch {
        return decrypted;
    }
}

}
