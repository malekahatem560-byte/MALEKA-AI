import { AgentDispatcher } from './agent_dispatcher';
import { EventBus } from '../core/event_bus';

export class RuntimeLoop {
    private running = false;
    private tickRate = 1000;

    constructor(
        private dispatcher: AgentDispatcher,
        private bus: EventBus
    ) {}

    public async start(): Promise<void> {

        this.running = true;

        this.bus.publish(
            'SYSTEM_STARTED',
            { timestamp: Date.now() }
        );

        while (this.running) {

            try {

                await this.dispatcher.dispatch(
                    'OBS_01',
                    { load: 10 }
                );

                await this.dispatcher.dispatch(
                    'EXEC_01',
                    {
                        data: Buffer.from(
                            JSON.stringify({
                                ts: Date.now(),
                                type: 'heartbeat'
                            })
                        ),
                        seq: BigInt(Date.now())
                    }
                );

                this.bus.publish(
                    'TELEMETRY_UPDATE',
                    {
                        cpu: process.cpuUsage(),
                        mem: process.memoryUsage().heapUsed
                    }
                );

            } catch (err) {

                console.error(
                    'Loop Error:',
                    err
                );
            }

            await new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        this.tickRate
                    )
            );
        }
    }

    public stop(): void {
        this.running = false;
    }
}
