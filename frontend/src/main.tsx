import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import "./ui/theme/theme.css"
import Workspace from "./ui/layout/Workspace"
import { registerHandlers } from "./core/commands/handlers"
import { registerDefaultAgents } from "./core/agents/defaultAgents"

registerHandlers()
registerDefaultAgents()

// Kernel warmup
import { malekaKernel } from "./core/kernel/malekaKernel"
console.log("Maleka Kernel initialized:", typeof malekaKernel)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Workspace />
  </StrictMode>
)
