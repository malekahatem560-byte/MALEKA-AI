import { theme } from "../design/theme"

export default function LogLine({ data }: any) {
  return (
    <div style={{
      fontSize: 12,
      padding: "6px 8px",
      marginBottom: 4,
      borderLeft: `2px solid ${theme.text.accent}`,
      color: theme.text.muted,
      background: "rgba(255,255,255,0.02)"
    }}>
      {JSON.stringify(data)}
    </div>
  )
}
