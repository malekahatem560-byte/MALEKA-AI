"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalExecutorAgent = void 0;
const child_process_1 = require("child_process");
const base_studio_agent_1 = require("../studio/agents/base_studio_agent");
class TerminalExecutorAgent extends base_studio_agent_1.BaseStudioAgent {
    async execute(task) {
        return new Promise((resolve) => {
            (0, child_process_1.exec)(task.command, (error, stdout, stderr) => {
                if (error)
                    resolve({ status: 'ERROR', output: stderr });
                else
                    resolve({ status: 'SUCCESS', output: stdout });
            });
        });
    }
}
exports.TerminalExecutorAgent = TerminalExecutorAgent;
