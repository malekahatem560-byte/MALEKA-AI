export class CRC32CValidator {
    public compute(data: Uint8Array): number {
        let crc = 0xFFFFFFFF;
        for (let i = 0; i < data.length; i++) {
            crc ^= data[i];
            for (let j = 0; j < 8; j++) {
                crc = (crc >>> 1) ^ ((crc & 1) ? 0x82F63B78 : 0);
            }
        }
        return (crc ^ 0xFFFFFFFF) >>> 0;
    }

    public static calculate(data: Uint8Array): number {
        return new CRC32CValidator().compute(data);
    }
    
    public static validate(data: Uint8Array, expected: number): boolean {
        return new CRC32CValidator().compute(data) === expected;
    }
}
