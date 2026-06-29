"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioKernel = void 0;
const studio_registry_1 = require("../services/studio_registry");
const cinematic_pipeline_1 = require("../pipeline/cinematic_pipeline");
class StudioKernel {
    registry = new studio_registry_1.StudioRegistry();
    createProject(id, title, description) {
        const project = {
            id,
            title,
            description,
            stage: cinematic_pipeline_1.CinematicStage.IDEA,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        this.registry.create(project);
        return project;
    }
    projects() {
        return this.registry.all();
    }
    stats() {
        return {
            projects: this.registry.count(),
            engine: 'CINEMATIC_CORE',
            status: 'ONLINE'
        };
    }
}
exports.StudioKernel = StudioKernel;
