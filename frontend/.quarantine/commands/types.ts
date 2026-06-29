export type Command =
  | { type: "STATUS.PING" }
  | { type: "SYSTEM.GET_CORE" }
  | { type: "SYSTEM.GET_STUDIO" }
  | { type: "SYSTEM.EXECUTE"; payload: string }

export type CommandResult<T = any> = {
  success: boolean
  data?: T
  error?: string
}
