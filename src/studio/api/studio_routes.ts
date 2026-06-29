import { Express } from 'express';
import { studioKernel } from '../runtime/studio_singleton';

export function registerStudioRoutes(app: Express){

app.get('/studio/status',(_,res)=>{
res.json(studioKernel.health());
});

app.get('/studio/projects',(_,res)=>{
res.json(
studioKernel.registry.all()
);
});

app.post('/studio/create',(req,res)=>{

const title =
req.body?.title || 'Untitled Project';

const description =
req.body?.description || '';

const project =
studioKernel.manager.createProject(
title,
description
);

res.json(project);

});

}
