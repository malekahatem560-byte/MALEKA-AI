type MemoryItem = {
  id: string
  timestamp: number
  data: unknown
}

const memory: MemoryItem[] = []

export const executionGateway = {
  async execute(input: unknown) {
    const result = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      success: true,
      output: input
    }

    memory.push({
      id: result.id,
      timestamp: Date.now(),
      data: result
    })

    return result
  },

  getMemory() {
    return memory
  }
}
