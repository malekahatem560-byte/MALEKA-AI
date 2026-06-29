export type AgentTask = {
  id: string
  type: string
  payload?: any
}

export type AgentResult = {
  id: string
  success: boolean
  data?: any
}
