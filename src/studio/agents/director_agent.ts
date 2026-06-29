import { BaseStudioAgent } from './base_studio_agent';

export class DirectorAgent extends BaseStudioAgent {
    async execute(task: any): Promise<any> {
        console.log(`[Director] Orchestrating scene: ${task.sceneId}`);
        // الربط مع الـ StateManager لاحقاً
        return { status: 'DIRECTING', scene: task.sceneId };
    }
}
