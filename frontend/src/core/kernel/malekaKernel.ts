import { execute } from "./executionCore"

export class MalekaKernel {
  async run(cmd: unknown) {
    return await execute(cmd)
  }
}

export const malekaKernel = new MalekaKernel()
