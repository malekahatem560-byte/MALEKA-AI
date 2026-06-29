import { unifiedEventBus } from "./unifiedEventBus"

export const eventBus = {
  on: unifiedEventBus.on.bind(unifiedEventBus),
  emit: unifiedEventBus.emit.bind(unifiedEventBus),
  getHistory: unifiedEventBus.getHistory.bind(unifiedEventBus)
}
