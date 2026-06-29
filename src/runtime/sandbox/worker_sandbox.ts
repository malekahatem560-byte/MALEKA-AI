import { Worker } from 'worker_threads';
import { join } from 'path';

export class WorkerSandbox {
  private static DEFAULT_TIMEOUT = 3000;

  public static run<T>(file: string, payload: any, timeout = WorkerSandbox.DEFAULT_TIMEOUT): Promise<T> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(join(process.cwd(), file), {
        workerData: payload
      });

      const timer = setTimeout(() => {
        worker.terminate();
        reject(new Error('[WORKER_SANDBOX] Timeout exceeded'));
      }, timeout);

      worker.on('message', (msg) => {
        clearTimeout(timer);
        resolve(msg);
      });

      worker.on('error', (err) => {
        clearTimeout(timer);
        reject(err);
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          clearTimeout(timer);
          reject(new Error(`[WORKER_SANDBOX] Exit code ${code}`));
        }
      });
    });
  }
}
