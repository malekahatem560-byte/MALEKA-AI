export class ExecutionSandbox {
  private static DEFAULT_TIMEOUT = 2000;

  public static async run<T>(
    fn: () => Promise<T>,
    timeout: number = ExecutionSandbox.DEFAULT_TIMEOUT
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('[SANDBOX] Execution timeout exceeded'));
      }, timeout);

      fn()
        .then((result) => {
          clearTimeout(timer);
          resolve(result);
        })
        .catch((err) => {
          clearTimeout(timer);
          reject(err);
        });
    });
  }
}
