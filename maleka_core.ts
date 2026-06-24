import * as fs from 'fs';
import * as http from 'http';
import * as WebSocket from 'ws';
import express = require('express');
import cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

class MalekaCore {
    public static process(raw: string): string {
        const [cmd, ...args] = raw.split(' ');
        switch(cmd) {
            case 'spawn':
                fs.mkdirSync(`./projects/${args[0] || 'unit'}`, { recursive: true });
                return `[MALEKA] Unit '${args[0]}' materialized.`;
            case 'render':
                return `[CINEMA] Stream initialized: ${args[0]}. Quality: 4K_ULTRA.`;
            case 'agent':
                return `[AGENT] ${args[0]} operational. Listening...`;
            default:
                return `[SYSTEM] Directive '${cmd}' logged in Tier-X memory.`;
        }
    }
}

// تعديل الربط ليكون متوافقاً مع الأنواع (Explicit Types)
wss.on('connection', (ws: WebSocket) => {
    ws.send(JSON.stringify({ type: 'STATUS', msg: 'MALEKA_CORE_LINKED' }));
    ws.on('message', (m: WebSocket.RawData) => {
        const response = MalekaCore.process(m.toString());
        ws.send(JSON.stringify({ type: 'LOG', msg: response }));
    });
});

server.listen(8080, () => {
    console.log("===============================================");
    console.log("MALEKA TIER-X CORE ONLINE: http://localhost:8080");
    console.log("===============================================");
});
