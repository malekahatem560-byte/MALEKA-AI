import { theme } from "../tokens/theme"

export default function StatusPill({ status }: { status: string }) {
  const color =
    status === "active" ? theme.colors.ok : theme.colors.danger

  return (
    <div style={{
      padding: "4px 10px",
      borderRadius: 999,
      background: color,
      color: "#000",
      fontSize: 11,
      fontWeight: 700,
    }}>
      {status.toUpperCase()}
    </div>
  )
}
