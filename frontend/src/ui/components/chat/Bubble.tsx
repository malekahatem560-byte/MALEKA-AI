export default function Bubble({ role, text }: { role: string, text: string }) {
  return (
    <div style={{
      alignSelf: role === "user" ? "flex-end" : "flex-start",
      background: role === "user" ? "#4da3ff" : "rgba(255,255,255,0.08)",
      color: "#fff",
      padding: "10px 14px",
      borderRadius: 14,
      marginBottom: 8,
      maxWidth: "70%"
    }}>
      {text}
    </div>
  )
}
