import type { ReactNode } from "react"

export default function ChatBubble({
  role,
  children
}: {
  role: "user" | "agent"
  children: ReactNode
}) {
  return (
    <div style={{
      display: "flex",
      justifyContent: role === "user" ? "flex-end" : "flex-start",
      marginBottom: 10
    }}>
      <div style={{
        maxWidth: "60%",
        padding: 12,
        borderRadius: 16,
        background: role === "user" ? "#4da3ff" : "rgba(255,255,255,0.06)",
        color: "#fff"
      }}>
        {children}
      </div>
    </div>
  )
}
