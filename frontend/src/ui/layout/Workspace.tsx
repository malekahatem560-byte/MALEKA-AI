
import StudioLayout from "../studio/layout/StudioLayout"
import "../theme/theme.css"

export default function Workspace() {
  return (
    <div style={{
      height: "100vh",
      overflow: "hidden",
      background: "#05070b"
    }}>
      <StudioLayout />
    </div>
  )
}
