import { StudioRegistry } from '../services/studio_registry';
import { StudioProject } from '../models/studio_project';
import { CinematicStage } from '../pipeline/cinematic_pipeline';

export class StudioKernel {

private registry = new StudioRegistry();

createProject(
id:string,
title:string,
description:string
){

const project:StudioProject = {
id,
title,
description,
stage:CinematicStage.IDEA,
createdAt:Date.now(),
updatedAt:Date.now()
};

this.registry.create(project);

return project;
}

projects(){
return this.registry.all();
}

stats(){
return {
projects:this.registry.count(),
engine:'CINEMATIC_CORE',
status:'ONLINE'
};
}

}
