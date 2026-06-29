import { useSyncExternalStore } from "react"

type Listener = () => void

class DockStore {
  private listeners: Listener[] = []

  private state = [
    { id: "explorer", title: "Explorer", area: "LEFT", visible: true },
    { id: "viewport", title: "Viewport", area: "CENTER", visible: true },
    { id: "inspector", title: "Inspector", area: "RIGHT", visible: true },
    { id: "memory", title: "Memory", area: "RIGHT", visible: true },
    { id: "graph", title: "Node Graph", area: "CENTER", visible: true },
    { id: "timeline", title: "Timeline", area: "BOTTOM", visible: true },
    { id: "console", title: "Console", area: "BOTTOM", visible: true }
  ]

  subscribe = (listener: Listener) => {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  private emit() {
    this.listeners.forEach(l => l())
  }

  get() {
    return this.state
  }

  move(id: string, area: string) {
    this.state = this.state.map(p =>
      p.id === id ? { ...p, area } : p
    )
    this.emit()
  }
}

export const dockStore = new DockStore()

export function useDock() {
  return useSyncExternalStore(
    dockStore.subscribe,
    dockStore.get,
    dockStore.get
  )
}
