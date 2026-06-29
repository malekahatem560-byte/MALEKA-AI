import ChatPanel from "../ui/chat/ChatPanel"
import MemoryPanel from "../ui/memory/MemoryPanel"
import TelemetryPanel from "../../ui/panels/TelemetryPanel"
import ReplayPanel from "../../ui/panels/ReplayPanel"

export default function AppShell({ view }: { view: string }) {

  const render = () => {
    switch(view) {
      case "chat":
        return <ChatPanel />
      case "memory":
        return <MemoryPanel />
      case "telemetry":
        return <TelemetryPanel />
      case "replay":
        return <ReplayPanel />
      default:
        return (
          <div style={{
            opacity: 0.7,
            letterSpacing: 2
          }}>
            CINEMATIC SYSTEM READY
          </div>
        )
    }
  }

  return render()
}
