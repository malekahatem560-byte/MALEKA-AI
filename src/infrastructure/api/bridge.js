"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startBridge = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const director_agent_1 = require("../../studio/agents/director_agent");
const startBridge = (port = 8080) => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // تهيئة الوكيل السينمائي
    const director = new director_agent_1.DirectorAgent('DIR_01', {}, {});
    app.post('/api/maleka/command', async (req, res) => {
        const { action, payload } = req.body;
        console.log(`[MALEKA BRIDGE] Routing ${action} to Director...`);
        // ربط مباشر: الواجهة -> Bridge -> DirectorAgent
        const result = await director.execute(payload);
        res.status(200).json({
            status: 'EXECUTED',
            directorResult: result
        });
    });
    app.listen(port, () => {
        console.log(`[MALEKA BRIDGE] Engine Gateway & DirectorAgent Active on port ${port}`);
    });
};
exports.startBridge = startBridge;
