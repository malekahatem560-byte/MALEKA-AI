export default function PanelFrame({ title, children }: any) {
  return (
    <div style={{
      background: "linear-gradient(180deg, #0f1622, #0b111a)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 14,
      padding: 12,
      boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
    }}>
      <div style={{
        fontSize: 11,
        letterSpacing: 1,
        color: "#00ff88",
        marginBottom: 8,
        opacity: 0.9
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}
