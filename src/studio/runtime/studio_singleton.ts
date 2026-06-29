import { StudioKernel } from '../core/studio_kernel';
import { StudioRuntime } from './studio_runtime';

export const studioKernel =
new StudioKernel();

export const studioRuntime =
new StudioRuntime(
studioKernel
);
