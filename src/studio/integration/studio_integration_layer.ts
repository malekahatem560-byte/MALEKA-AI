import { EventBus } from '../../core/event_bus';
import { StudioKernel } from '../core/studio_kernel';

export class StudioIntegrationLayer {

    constructor(
        private readonly studio: StudioKernel,
        private readonly bus: EventBus
    ) {}

    public initialize(): void {

        this.bus.on(
            'SYSTEM_STARTED',
            payload => {

                console.log(
                    '[STUDIO-INTEGRATION] Runtime Online',
                    payload
                );

            }
        );

        this.bus.on(
            'TELEMETRY_UPDATE',
            payload => {

                const projects =
                    this.studio.registry.all();

                console.log(
                    '[STUDIO-INTEGRATION]',
                    'projects=',
                    projects.length,
                    'telemetry=',
                    payload
                );

            }
        );
    }
}
