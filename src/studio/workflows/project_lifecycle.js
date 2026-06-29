"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectLifecycle = void 0;
const cinematic_pipeline_1 = require("../pipeline/cinematic_pipeline");
class ProjectLifecycle {
    advance(project) {
        const order = [
            cinematic_pipeline_1.CinematicStage.IDEA,
            cinematic_pipeline_1.CinematicStage.SCRIPT,
            cinematic_pipeline_1.CinematicStage.STORYBOARD,
            cinematic_pipeline_1.CinematicStage.SHOTS,
            cinematic_pipeline_1.CinematicStage.CHARACTERS,
            cinematic_pipeline_1.CinematicStage.WORLD,
            cinematic_pipeline_1.CinematicStage.VOICE,
            cinematic_pipeline_1.CinematicStage.MUSIC,
            cinematic_pipeline_1.CinematicStage.VIDEO,
            cinematic_pipeline_1.CinematicStage.EDIT,
            cinematic_pipeline_1.CinematicStage.RENDER,
            cinematic_pipeline_1.CinematicStage.DELIVERY
        ];
        const currentIndex = order.indexOf(project.stage);
        if (currentIndex >= 0 &&
            currentIndex < order.length - 1) {
            project.stage = order[currentIndex + 1];
            project.updatedAt = Date.now();
        }
        return project;
    }
}
exports.ProjectLifecycle = ProjectLifecycle;
