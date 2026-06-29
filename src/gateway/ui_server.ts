import express from "express";
import path from "path";

export function registerUI(app: express.Express) {

  app.get("/studio", (_, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>MALEKA STUDIO</title>
</head>
<body style="background:black;color:white;font-family:monospace">
  <h1>MALEKA STUDIO ONLINE</h1>

  <button onclick="loadStatus()">Refresh Status</button>
  <pre id="out"></pre>

  <script>
    async function loadStatus() {
      const res = await fetch('/studio/status');
      const data = await res.json();
      document.getElementById('out').innerText = JSON.stringify(data, null, 2);
    }
  </script>
</body>
</html>
    `);
  });

}
