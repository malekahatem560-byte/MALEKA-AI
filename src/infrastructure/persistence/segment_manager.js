"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentManager = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class SegmentManager {
    basePath;
    maxSegmentSize;
    constructor(basePath, maxSegmentSize) {
        this.basePath = basePath;
        this.maxSegmentSize = maxSegmentSize;
    }
    async rotate(partition) {
        const timestamp = Date.now();
        const newSegmentPath = (0, path_1.join)(this.basePath, `${partition}-${timestamp}.log`);
        await fs_1.promises.writeFile(newSegmentPath, '');
        return newSegmentPath;
    }
    async getActiveSegment(partition) {
        return (0, path_1.join)(this.basePath, `${partition}.active.log`);
    }
    async checkRetention(partition, maxAge) {
        const files = await fs_1.promises.readdir(this.basePath);
        for (const file of files) {
            if (file.startsWith(partition)) {
                const stats = await fs_1.promises.stat((0, path_1.join)(this.basePath, file));
                if (Date.now() - stats.mtimeMs > maxAge) {
                    await fs_1.promises.unlink((0, path_1.join)(this.basePath, file));
                }
            }
        }
    }
}
exports.SegmentManager = SegmentManager;
