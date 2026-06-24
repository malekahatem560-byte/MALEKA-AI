import { CRC32CValidator } from './crc32c_validator';

export class MeshSync {
    private readonly validator = new CRC32CValidator();
    private peers: string[] = [];

    public async broadcast(payload: Uint8Array): Promise<void> {
        const crc = this.validator.compute(payload);
        await Promise.all(this.peers.map(peer => this.transmit(peer, payload, crc)));
    }

    private async transmit(peer: string, data: Uint8Array, crc: number): Promise<void> {
        console.log(`[Mesh] Relaying to ${peer} | Integrity: ${crc.toString(16)}`);
    }
}
