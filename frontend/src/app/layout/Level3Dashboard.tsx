import { useEffect, useState } from "react"
import { executeCommand } from "../../services/commandAPI"
import CommandPalette from "../ui/command/CommandPalette"

export default function Level3Dashboard() {
  const [core, setCore] = useState<any>(null)
  const [studio, setStudio] = useState<any>(null)

  async function refresh() {
    try {
      const c = await executeCommand({ type: "SYSTEM.GET_CORE" } as any)
      const s = await executeCommand({ type: "SYSTEM.GET_STUDIO" } as any)

      setCore(c)
      setStudio(s)
    } catch {}
  }

  useEffect(() => {
    refresh()
    const i = setInterval(refresh, 2000)
    return () => clearInterval(i)
  }, [])

  return (
    <div style={{
      display:"grid",
      gridTemplateColumns:"260px 1fr 320px",
      height:"100vh",
      background:"#05070a",
      color:"#fff",
      fontFamily:"system-ui"
    }}>

      <div style={{ borderRight:"1px solid #1f2a36", padding:20 }}>
        <h3>MALEKA</h3>
        <div style={{ marginTop:20, opacity:0.6 }}>
          CONTROL LAYER
        </div>
      </div>

      <div style={{ padding:20 }}>
        <h2>LEVEL 3 COMMAND DECK</h2>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(2,1fr)",
          gap:12,
          marginTop:20
        }}>
          <Panel label="CPU" value={core?.data?.cpu} />
          <Panel label="RAM" value={core?.data?.ram} />
          <Panel label="AGENTS" value={studio?.data?.agents} />
          <Panel label="EVENTS" value={studio?.data?.events} />
          <Panel label="MEMORY" value={studio?.data?.memory} />
          <Panel label="INTELLIGENCE" value={studio?.data?.intelligence} />
        </div>
      </div>

      <div style={{ borderLeft:"1px solid #1f2a36", padding:20 }}>
        <h4>LIVE STREAM</h4>
        <div style={{ marginTop:20, fontSize:12, opacity:0.6 }}>
          SYSTEM FEED ACTIVE
        </div>
      </div>

      <CommandPalette />
    </div>
  )
}

function Panel({ label, value }: any) {
  return (
    <div style={{
      padding:12,
      border:"1px solid #1f2a36",
      borderRadius:8,
      background:"#0b0f14"
    }}>
      <div style={{ fontSize:12, opacity:0.6 }}>{label}</div>
      <div style={{ fontSize:18 }}>{String(value ?? "...")}</div>
    </div>
  )
}
