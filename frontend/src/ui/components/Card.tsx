import { tokens } from "../theme/tokens"

export default function Card(props: any) {
  return (
    <div style={{
      background: tokens.color.panel,
      border: `1px solid ${tokens.color.panelBorder}`,
      borderRadius: tokens.radius.md,
      padding: "16px",
      boxShadow: tokens.shadow.soft,
      backdropFilter: "blur(10px)"
    }}>
      {props.children}
    </div>
  )
}
