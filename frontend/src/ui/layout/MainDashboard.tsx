
import ExecutionConsolePanel from "../panels/ExecutionConsolePanel"
import ExecutionGraphPanel from "../panels/ExecutionGraphPanel"
import Panel from "../primitives/Panel"
import { theme } from "../design/theme"

export default function MainDashboard() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "280px 1fr 420px",
      height: "100vh",
      background: theme.bg.app,
      color: theme.text.main,
      fontFamily: "system-ui"
    }}>

      <div style={{ padding: 12 }}>
        <Panel title="COMMAND CENTER">
          <div style={{ color: theme.text.muted, fontSize: 12 }}>
            Ready for input...
          </div>
        </Panel>
      </div>

      <div style={{ padding: 12 }}>
        <ExecutionConsolePanel />
      </div>

      <div style={{ padding: 12 }}>
        <ExecutionGraphPanel />
      </div>

    </div>
  )
}
