import { CRC32CValidator } from './crc32c_validator';
const testData = new Uint8Array(Buffer.from("123456789"));
const result = CRC32CValidator.calculate(testData);
if (result === 0xE3069283) {
    process.exit(0);
} else {
    process.exit(1);
}
