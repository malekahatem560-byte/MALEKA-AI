import { exec } from 'child_process';
import { BaseStudioAgent } from '../studio/agents/base_studio_agent';

export class TerminalExecutorAgent extends BaseStudioAgent {
    async execute(task: { command: string }): Promise<any> {
        return new Promise((resolve) => {
            exec(task.command, (error, stdout, stderr) => {
                if (error) resolve({ status: 'ERROR', output: stderr });
                else resolve({ status: 'SUCCESS', output: stdout });
            });
        });
    }
}
