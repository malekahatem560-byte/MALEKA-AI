"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioIntegrationLayer = void 0;
class StudioIntegrationLayer {
    studio;
    bus;
    constructor(studio, bus) {
        this.studio = studio;
        this.bus = bus;
    }
    initialize() {
        this.bus.on('SYSTEM_STARTED', payload => {
            console.log('[STUDIO-INTEGRATION] Runtime Online', payload);
        });
        this.bus.on('TELEMETRY_UPDATE', payload => {
            const projects = this.studio.registry.all();
            console.log('[STUDIO-INTEGRATION]', 'projects=', projects.length, 'telemetry=', payload);
        });
    }
}
exports.StudioIntegrationLayer = StudioIntegrationLayer;
