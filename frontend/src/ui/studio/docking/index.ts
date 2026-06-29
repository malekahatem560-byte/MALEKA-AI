export type DockArea = "LEFT" | "RIGHT" | "BOTTOM" | "CENTER"

export type DockPanel = {
  id: string
  title: string
  area: DockArea
  visible: boolean
}

class DockingEngine {
  private panels: DockPanel[] = [
    { id: "explorer", title: "Explorer", area: "LEFT", visible: true },
    { id: "viewport", title: "Viewport", area: "CENTER", visible: true },
    { id: "inspector", title: "Inspector", area: "RIGHT", visible: true },
    { id: "memory", title: "Memory", area: "RIGHT", visible: true },
    { id: "graph", title: "Node Graph", area: "CENTER", visible: true },
    { id: "timeline", title: "Timeline", area: "BOTTOM", visible: true },
    { id: "console", title: "Console", area: "BOTTOM", visible: true }
  ]

  all() {
    return this.panels
  }

  move(id: string, area: DockArea) {
    const p = this.panels.find(x => x.id === id)
    if (p) p.area = area
  }

  toggle(id: string) {
    const p = this.panels.find(x => x.id === id)
    if (p) p.visible = !p.visible
  }
}

export const dockingEngine = new DockingEngine()
