import * as http from 'http';
// واجهة الويب الذكية
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <body style="background:#111; color:#0f0; font-family:monospace; padding:20px;">
                    <h1>BF-OS Dashboard</h1>
                    <p>Status: <span id="status">OPERATIONAL</span></p>
                    <button onclick="alert('System Optimization Triggered')">Optimize Core</button>
                </body>
            </html>
        `);
    }
});
server.listen(8080, () => {
    console.log("[WEB] Dashboard active at http://localhost:8080");
});
