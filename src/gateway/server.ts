import { registerStudioGeneration } from "./studio_generation_routes";
import { registerUI } from "./ui_server";
import { registerStudioRoutes } from "./studio_routes_patch";
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());
registerStudioGeneration(app);
registerUI(app);
registerStudioRoutes(app);

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
    } catch (e) {
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
