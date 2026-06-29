export type Node = {
  id: string
  type: string
  data?: any
}

export type Edge = {
  from: string
  to: string
  relation: string
}

class MemoryGraph {
  nodes: Node[] = []
  edges: Edge[] = []

  addNode(node: Node) {
    this.nodes.push(node)
  }

  addEdge(edge: Edge) {
    this.edges.push(edge)
  }

  snapshot() {
    return {
      nodes: this.nodes,
      edges: this.edges
    }
  }
}

export const memoryGraph = new MemoryGraph()
