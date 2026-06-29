import { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import TopBar from "./TopBar"
import { executeCommand } from "../../services/commandAPI"

export default function Dashboard() {

  const [core, setCore] = useState<any>(null)
  const [studio, setStudio] = useState<any>(null)

  useEffect(() => {
    const load = async () => {

      const c = await executeCommand({ type: "SYSTEM.GET_CORE" })
      const s = await executeCommand({ type: "SYSTEM.GET_STUDIO" })

      setCore(c.data)
      setStudio(s.data)
    }

    load()
    const i = setInterval(load, 2000)
    return () => clearInterval(i)
  }, [])

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopBar />

        <div style={{ padding: 22 }}>
          <h2 style={{ marginBottom: 18 }}>
            GLOBAL SYSTEM OVERVIEW (LIVE RENDER ACTIVE)
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14
          }}>

            <Panel label="CPU" value={core?.cpu} />
            <Panel label="RAM" value={core?.ram} />
            <Panel label="AGENTS" value={studio?.agents} />
            <Panel label="EVENTS" value={studio?.events} />
            <Panel label="MEMORY" value={studio?.memory} />
            <Panel label="INTELLIGENCE" value={studio?.intelligence} />

          </div>
        </div>
      </div>
    </div>
  )
}

function Panel({ label, value }: any) {
  return (
    <div style={{
      padding: 16,
      borderRadius: 14,
      background: "var(--panel)",
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow)",
      backdropFilter: "blur(14px)"
    }}>
      <div style={{ color: "var(--muted)", fontSize: 12 }}>
        {label}
      </div>

      <div style={{ fontSize: 22, marginTop: 8 }}>
        {value ?? "..."}
      </div>
    </div>
  )
}
