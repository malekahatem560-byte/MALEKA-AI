#!/data/data/com.termux/files/usr/bin/bash

# إضافة static UI serving إلى gateway
cat > src/gateway/ui_patch.ts << 'EOT'
import path from "path";
import express from "express";

export function registerUI(app: any) {
  const uiPath = path.resolve("dist/ui");

  // serve static build
  app.use("/ui", express.static(uiPath));

  // fallback to dashboard
  app.get("/studio", (_, res) => {
    res.sendFile(path.join(uiPath, "pages/Dashboard.js"));
  });

  app.get("/", (_, res) => {
    res.redirect("/studio");
  });
}
EOT

echo "UI patch created"
