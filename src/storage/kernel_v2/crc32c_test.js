"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crc32c_validator_1 = require("./crc32c_validator");
const testData = new Uint8Array(Buffer.from("123456789"));
const result = crc32c_validator_1.CRC32CValidator.calculate(testData);
if (result === 0xE3069283) {
    process.exit(0);
}
else {
    process.exit(1);
}
