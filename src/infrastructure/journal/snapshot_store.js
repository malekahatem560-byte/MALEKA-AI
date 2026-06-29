"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapshotStore = void 0;
const fs_1 = require("fs");
const path = __importStar(require("path"));
class SnapshotStore {
    dir = path.join(process.cwd(), 'snapshots');
    constructor() { }
    async save(id, state) {
        await fs_1.promises.mkdir(this.dir, { recursive: true });
        const file = path.join(this.dir, `${id}.json`);
        await fs_1.promises.writeFile(file, JSON.stringify({
            id,
            state,
            timestamp: Date.now()
        }));
    }
    async load(id) {
        try {
            const file = path.join(this.dir, `${id}.json`);
            const data = await fs_1.promises.readFile(file, 'utf-8');
            return JSON.parse(data);
        }
        catch {
            return null;
        }
    }
}
exports.SnapshotStore = SnapshotStore;
