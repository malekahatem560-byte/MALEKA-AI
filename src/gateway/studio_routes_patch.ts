import express from "express";
import path from "path";

export function registerStudioRoutes(app: express.Express) {

  // صحة الاستوديو
  app.get("/studio/status", (_, res) => {
    res.json({
      studio: "ONLINE",
      ui: "AVAILABLE",
      runtime: "ACTIVE"
    });
  });

  // قائمة المشاريع (dummy fallback)
  app.get("/studio/projects", (_, res) => {
    res.json({
      projects: [],
      message: "Studio UI backend reachable"
    });
  });

}
