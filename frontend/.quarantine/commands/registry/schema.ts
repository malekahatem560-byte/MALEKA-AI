export const CommandSchema = {
  "STATUS.PING": true,
  "SYSTEM.GET_CORE": true,
  "SYSTEM.GET_STUDIO": true,
  "SYSTEM.EXECUTE": true,
  "SYSTEM.RUN_AGENTS": true,
  "SYSTEM.DIRECTOR.RUN": true,
  "MEMORY.QUERY": true
} as const

export type CommandType = keyof typeof CommandSchema
