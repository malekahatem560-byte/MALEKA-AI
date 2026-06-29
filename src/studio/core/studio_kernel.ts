import { StudioRegistry } from '../services/studio_registry';
import { StudioManager } from '../services/studio_manager';

export class StudioKernel {

public readonly registry =
new StudioRegistry();

public readonly manager =
new StudioManager(
this.registry
);

public health() {
return {
status: 'ONLINE',
projects: this.registry.count(),
timestamp: Date.now()
};
}

}
