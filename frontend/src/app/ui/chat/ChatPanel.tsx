import { useState } from "react"
import { executionGateway } from "../../../core/gateway/execution_gateway"

export default function ChatPanel() {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState("")

  const send = async () => {
    const text = input
    setInput("")

    setMessages(m => [...m, { role: "user", text }])

    const result = await executionGateway.execute(text).then(r => r)

    setMessages(m => [
      ...m,
      { role: "assistant", text: JSON.stringify(result, null, 2) }
    ])
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflow: "auto", padding: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <b>{m.role}</b>: {m.text}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={send}>EXECUTE</button>
      </div>
    </div>
  )
}
