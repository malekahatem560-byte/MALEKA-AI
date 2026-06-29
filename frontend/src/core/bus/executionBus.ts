import { controlKernel } from "../kernel/controlKernel"
import { memoryGraph } from "../memory/memoryGraph"

export class ExecutionBus {

  async run(input: string) {

    // 1. سجل الأمر في الذاكرة
    memoryGraph.add({
      id: crypto.randomUUID(),
      type: "command",
      data: input,
    })

    // 2. تنفيذ عبر kernel
    const result = controlKernel.snapshot()

    // 3. سجل النتيجة
    memoryGraph.add({
      id: crypto.randomUUID(),
      type: "event",
      data: { result },
    })

    return result
  }
}

export const executionBus = new ExecutionBus()
