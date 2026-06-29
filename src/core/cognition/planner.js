"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Planner = void 0;
class Planner {
    async createPlan(goal) {
        const steps = [
            {
                id: 'step_1',
                description: 'Analyze goal',
                completed: false
            },
            {
                id: 'step_2',
                description: 'Generate strategy',
                completed: false
            },
            {
                id: 'step_3',
                description: 'Execute actions',
                completed: false
            }
        ];
        return {
            goal,
            steps
        };
    }
}
exports.Planner = Planner;
