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

class MalekaStudio {
    public static execute(raw: string): string {
        const [cmd, ...args] = raw.split(' ');
        switch(cmd) {
            case 'spawn':
                const name = args[0] || 'unit_alpha';
                fs.mkdirSync(`./projects/${name}`, { recursive: true });
                return `[STUDIO] Entity '${name}' materialized in memory.`;
            case 'render':
                return `[CINEMA] Initiating 4K HDR stream for project: ${args[0] || 'Active'}`;
            case 'agent':
                return `[AGENT] ${args[0]} initialized. Awaiting creative directives.`;
            default:
                return `[SYSTEM] Directive '${cmd}' awaiting higher-level logic.`;
        }
    }
}

wss.on('connection', (ws) => {
    ws.send(JSON.stringify({ type: 'STATUS', msg: 'MALEKA_STUDIO_CONNECTED' }));
    ws.on('message', (m) => {
        const response = MalekaStudio.execute(m.toString());
        ws.send(JSON.stringify({ type: 'LOG', msg: response }));
    });
});

server.listen(8080, () => {
    console.log("===============================================");
    console.log("MALEKA TIER-X STUDIO ONLINE: http://localhost:8080");
    console.log("===============================================");
});
