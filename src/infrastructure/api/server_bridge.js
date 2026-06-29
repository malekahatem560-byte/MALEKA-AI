"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startBridge = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const startBridge = (port = 8080) => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // نقطة اتصال الواجهة (Lovable Interface)
    app.post('/api/studio/command', async (req, res) => {
        const { action, payload } = req.body;
        console.log(`[BRIDGE] Received command: ${action}`);
        // هنا يتم التوجيه للمحرك (سيتم ربط الوكلاء لاحقاً)
        res.status(200).json({
            status: 'RECEIVED',
            action: action,
            message: 'Command routed to Maleka Core'
        });
    });
    app.listen(port, () => {
        console.log(`[BRIDGE] Maleka API Gateway active on port ${port}`);
    });
};
exports.startBridge = startBridge;
