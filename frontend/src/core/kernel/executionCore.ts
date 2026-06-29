export type Command = unknown

export type ExecutionResult = {
  id: string
  success: boolean
  data: any
}

export async function execute(cmd: Command): Promise<ExecutionResult> {
  return {
    id: crypto.randomUUID?.() ?? String(Date.now()),
    success: true,
    data: {
      received: cmd,
      processed: true
    }
  }
}
