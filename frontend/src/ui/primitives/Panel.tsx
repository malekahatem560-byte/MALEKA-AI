import { theme } from "../design/theme"

export default function Panel({ title, children }: any) {
  return (
    <div style={{
      background: theme.bg.panel,
      border: `1px solid ${theme.border.soft}`,
      borderRadius: theme.radius.md,
      padding: 12,
      boxShadow: theme.shadow.soft
    }}>
      {title && (
        <div style={{
          marginBottom: 10,
          color: theme.text.accent,
          fontWeight: 600,
          fontSize: 13
        }}>
          {title}
        </div>
      )}
      {children}
    </div>
  )
}
