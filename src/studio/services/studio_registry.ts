import { StudioProject } from '../models/studio_project';

export class StudioRegistry {
private projects = new Map<string,StudioProject>();

create(project:StudioProject){
this.projects.set(project.id,project);
}

all(){
return [...this.projects.values()];
}

count(){
return this.projects.size;
}
}
