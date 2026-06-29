export type DockArea = "LEFT" | "RIGHT" | "CENTER" | "BOTTOM"

export type Panel = {
  id: string
  title: string
  area: DockArea
  visible: boolean
}

type Listener = () => void

class UIKernel {
  private listeners: Listener[] = []

  private state: Panel[] = [
    { id: "explorer", title: "Explorer", area: "LEFT", visible: true },
    { id: "viewport", title: "Viewport", area: "CENTER", visible: true },
    { id: "inspector", title: "Inspector", area: "RIGHT", visible: true },
    { id: "memory", title: "Memory", area: "RIGHT", visible: true },
    { id: "graph", title: "Node Graph", area: "CENTER", visible: true },
    { id: "timeline", title: "Timeline", area: "BOTTOM", visible: true },
    { id: "console", title: "Console", area: "BOTTOM", visible: true }
  ]

  subscribe = (fn: Listener) => {
    this.listeners.push(fn)
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn)
    }
  }

  private emit() {
    this.listeners.forEach(l => l())
  }

  getState() {
    return this.state
  }

  move(id: string, area: DockArea) {
    this.state = this.state.map(p =>
      p.id === id ? { ...p, area } : p
    )
    this.emit()
  }

  toggle(id: string) {
    this.state = this.state.map(p =>
      p.id === id ? { ...p, visible: !p.visible } : p
    )
    this.emit()
  }
}

export const uiKernel = new UIKernel()
