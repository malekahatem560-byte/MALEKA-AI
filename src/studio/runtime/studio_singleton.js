"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studioRuntime = exports.studioKernel = void 0;
const studio_kernel_1 = require("../core/studio_kernel");
const studio_runtime_1 = require("./studio_runtime");
exports.studioKernel = new studio_kernel_1.StudioKernel();
exports.studioRuntime = new studio_runtime_1.StudioRuntime(exports.studioKernel);
