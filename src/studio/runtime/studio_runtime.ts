import { StudioKernel } from '../core/studio_kernel';

export class StudioRuntime {

constructor(
private kernel:StudioKernel
){}

start(){

console.log(
'[STUDIO_RUNTIME]',
'Managed By Core Runtime'
);

}

}
