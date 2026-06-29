import { StudioRegistry } from './studio_registry';
import { StudioProject } from '../models/studio_project';
import { ProjectLifecycle } from '../workflows/project_lifecycle';

export class StudioManager {

private lifecycle = new ProjectLifecycle();

constructor(
private registry: StudioRegistry
) {}

createProject(
title: string,
description: string
): StudioProject {

const project: StudioProject = {
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

advanceProject(
project: StudioProject
): StudioProject {
return this.lifecycle.advance(project);
}

}
