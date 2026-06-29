"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStudioRoutes = registerStudioRoutes;
const studio_singleton_1 = require("../runtime/studio_singleton");
function registerStudioRoutes(app) {
    app.get('/studio/status', (_, res) => {
        res.json(studio_singleton_1.studioKernel.health());
    });
    app.get('/studio/projects', (_, res) => {
        res.json(studio_singleton_1.studioKernel.registry.all());
    });
    app.post('/studio/create', (req, res) => {
        const title = req.body?.title || 'Untitled Project';
        const description = req.body?.description || '';
        const project = studio_singleton_1.studioKernel.manager.createProject(title, description);
        res.json(project);
    });
}
