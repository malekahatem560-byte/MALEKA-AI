import { CinematicStage } from '../pipeline/cinematic_pipeline';
import { StudioProject } from '../models/studio_project';

export class ProjectLifecycle {

public advance(project: StudioProject): StudioProject {

const order = [
CinematicStage.IDEA,
CinematicStage.SCRIPT,
CinematicStage.STORYBOARD,
CinematicStage.SHOTS,
CinematicStage.CHARACTERS,
CinematicStage.WORLD,
CinematicStage.VOICE,
CinematicStage.MUSIC,
CinematicStage.VIDEO,
CinematicStage.EDIT,
CinematicStage.RENDER,
CinematicStage.DELIVERY
];

const currentIndex = order.indexOf(
project.stage as CinematicStage
);

if (
currentIndex >= 0 &&
currentIndex < order.length - 1
) {
project.stage = order[currentIndex + 1];
project.updatedAt = Date.now();
}

return project;
}

}
