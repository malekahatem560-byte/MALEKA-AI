import * as http from 'http';
import * as WebSocket from 'ws';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <html>
            <body style="background:#000; color:#0f0; font-family:monospace; padding:20px;">
                <h1>MALEKA Atomic Interface</h1>
                <div id="output" style="border:1px solid #0f0; padding:10px; height:200px; overflow-y:scroll;"></div>
                <input id="cmd" placeholder="Enter Command..." style="background:#222; color:#0f0; border:1px solid #0f0; width:80%;">
                <button onclick="send()">EXECUTE</button>
                <script>
                    const ws = new WebSocket('ws://localhost:8081');
                    ws.onmessage = (e) => document.getElementById('output').innerHTML += '<p>> ' + e.data + '</p>';
                    function send() { 
                        ws.send(document.getElementById('cmd').value); 
                        document.getElementById('cmd').value = ''; 
                    }
                </script>
            </body>
        </html>
    `);
});

const wss = new WebSocket.Server({ port: 8081 });

// التحديث هنا: إضافة أنواع صريحة للبيانات (ws: WebSocket, msg: WebSocket.RawData)
wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (msg: WebSocket.RawData) => {
        console.log(`[MALEKA RECEIVED] ${msg.toString()}`);
        ws.send(`Processing atomic command: ${msg.toString()}... SUCCESS`);
    });
});

server.listen(8080, () => console.log("[INTERFACE] Live Atomic Dashboard: http://localhost:8080"));
