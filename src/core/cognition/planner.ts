import {
CognitivePlan,
PlanStep
} from './types';

export class Planner {

public async createPlan(
    goal: string
): Promise<CognitivePlan> {

    const steps: PlanStep[] = [
        {
            id: 'step_1',
            description:
                'Analyze goal',
            completed: false
        },
        {
            id: 'step_2',
            description:
                'Generate strategy',
            completed: false
        },
        {
            id: 'step_3',
            description:
                'Execute actions',
            completed: false
        }
    ];

    return {
        goal,
        steps
    };
}

}
