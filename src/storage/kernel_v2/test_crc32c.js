"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crc32c_validator_1 = require("./crc32c_validator");
function runValidation() {
    // Standard test vector for Castagnoli CRC32C: "123456789"
    // Expected result: 0xE3069283 (3808858755)
    const testString = "123456789";
    const buffer = new Uint8Array(Buffer.from(testString, 'utf-8'));
    const expected = 0xE3069283;
    const calculated = crc32c_validator_1.CRC32CValidator.calculate(buffer);
    const isValid = crc32c_validator_1.CRC32CValidator.validate(buffer, expected);
    if (calculated !== expected || !isValid) {
        console.error(`[FATAL] CRC32C mismatch. Expected: ${expected}, Got: ${calculated}`);
        process.exit(1);
    }
    console.log("[SUCCESS] CRC32C Validator physical integrity test passed.");
    console.log(`Calculated: 0x${calculated.toString(16).toUpperCase()} (Match expected 0xE3069283)`);
    process.exit(0);
}
runValidation();
