import { commandBus } from "./commandBus"

export function registerHandlers() {

  commandBus.register("STATUS.PING", async () => {
    return { success: true, data: { status: "OK" } }
  })

  commandBus.register("SYSTEM.GET_CORE", async () => {
    return {
      success: true,
      data: {
        cpu: Math.floor(Math.random() * 100),
        ram: Math.floor(Math.random() * 100)
      }
    }
  })

  commandBus.register("SYSTEM.GET_STUDIO", async () => {
    return {
      success: true,
      data: {
        agents: 12,
        events: 44,
        memory: 78,
        intelligence: 91
      }
    }
  })

  commandBus.register("SYSTEM.EXECUTE", async (cmd: any) => {
    return {
      success: true,
      data: { executed: cmd.payload }
    }
  })

}
