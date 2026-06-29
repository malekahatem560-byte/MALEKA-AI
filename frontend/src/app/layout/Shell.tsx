import Glass from "../../ui/components/Glass"
import ChatPanel from "../ui/chat/ChatPanel"
import MemoryPanel from "../ui/memory/MemoryPanel"

export default function Shell() {
  return (
    <div style={{
      height: "100vh",
      display: "grid",
      gridTemplateColumns: "260px 1fr 260px",
      gap: 12,
      padding: 12,
      background: "#05070d"
    }}>

      <Glass>
        <div>CORE</div>
      </Glass>

      <Glass>
        <ChatPanel />
      </Glass>

      <Glass>
        <MemoryPanel />
      </Glass>

    </div>
  )
}
