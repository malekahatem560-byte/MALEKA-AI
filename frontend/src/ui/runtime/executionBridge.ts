
import { malekaKernel } from "../../core/kernel/malekaKernel"

export async function runCommand(cmd: unknown) {
  return await malekaKernel.run(cmd)
}
