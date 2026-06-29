type JobStatus = "QUEUED" | "RUNNING" | "DONE" | "FAILED";

interface StudioJob {
  id: string;
  prompt: string;
  status: JobStatus;
  progress: number;
  output?: string;
}

const jobs = new Map<string, StudioJob>();

export function submitJob(prompt: string) {
  const id = Date.now().toString();

  const job: StudioJob = {
    id,
    prompt,
    status: "QUEUED",
    progress: 0
  };

  jobs.set(id, job);

  setTimeout(() => {
    job.status = "RUNNING";
    job.progress = 50;
  }, 1000);

  setTimeout(() => {
    job.status = "DONE";
    job.progress = 100;
    job.output = "/outputs/" + id + ".mp4";
  }, 4000);

  return job;
}

export function getJob(id: string) {
  return jobs.get(id);
}

export function listJobs() {
  return [...jobs.values()];
}
