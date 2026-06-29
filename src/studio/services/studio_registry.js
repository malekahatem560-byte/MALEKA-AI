"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioRegistry = void 0;
class StudioRegistry {
    projects = new Map();
    create(project) {
        this.projects.set(project.id, project);
    }
    all() {
        return [...this.projects.values()];
    }
    count() {
        return this.projects.size;
    }
}
exports.StudioRegistry = StudioRegistry;
