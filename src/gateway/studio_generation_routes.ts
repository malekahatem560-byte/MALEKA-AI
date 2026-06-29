import express from "express";
import { submitJob, getJob, listJobs } from "../studio/execution/studio_executor";

export function registerStudioGeneration(app: express.Express) {

  // إرسال أمر توليد فيديو
  app.post("/studio/generate-video", (req, res) => {
    const { prompt } = req.body;
    const job = submitJob(prompt);
    res.json(job);
  });

  // حالة أمر
  app.get("/studio/job/:id", (req, res) => {
    res.json(getJob(req.params.id));
  });

  // كل الأوامر
  app.get("/studio/jobs", (_, res) => {
    res.json(listJobs());
  });
}
