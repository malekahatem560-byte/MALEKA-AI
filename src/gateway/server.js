"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
app.use(express_1.default.json());
// حالة النظام
let engineStatus = {
    runtime: "loading",
    kernel: "unknown",
};
// WebSocket channel
wss.on("connection", (ws) => {
    ws.send(JSON.stringify({
        type: "system",
        message: "MALEKA GATEWAY CONNECTED"
    }));
    ws.on("message", (msg) => {
        try {
            const data = JSON.parse(msg.toString());
            if (data.action === "status") {
                ws.send(JSON.stringify({
                    type: "status",
                    payload: engineStatus
                }));
            }
            if (data.action === "ping") {
                ws.send(JSON.stringify({ type: "pong" }));
            }
        }
        catch (e) {
            ws.send(JSON.stringify({ type: "error", message: "invalid message" }));
        }
    });
});
// REST endpoint للـ UI
app.get("/api/status", (_, res) => {
    res.json(engineStatus);
});
// تحديث من engine لاحقاً (hook بسيط)
app.post("/api/update", (req, res) => {
    engineStatus = { ...engineStatus, ...req.body };
    res.json({ ok: true });
});
server.listen(8080, () => {
    console.log("[GATEWAY] running on :8080");
});
