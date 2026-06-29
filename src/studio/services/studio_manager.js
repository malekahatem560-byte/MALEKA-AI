"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioManager = void 0;
const project_lifecycle_1 = require("../workflows/project_lifecycle");
class StudioManager {
    registry;
    lifecycle = new project_lifecycle_1.ProjectLifecycle();
    constructor(registry) {
        this.registry = registry;
    }
    createProject(title, description) {
        const project = {
            id: "studio_${Date.now()}",
            title,
            description,
            stage: 'IDEA',
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        this.registry.create(project);
        return project;
    }
    advanceProject(project) {
        return this.lifecycle.advance(project);
    }
}
exports.StudioManager = StudioManager;
