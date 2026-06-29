import { EventBus } from '../event_bus';
import { EventBridge } from './event_bridge';

export function createEventBusProxy(bus: EventBus) {
  const bridge = new EventBridge(bus);

  return {
    on: bus.on.bind(bus),
    off: bus.off.bind(bus),
    emit: bus.emit.bind(bus),

    // legacy compatibility
    publish: bridge.publish.bind(bridge),
    subscribe: bridge.subscribe.bind(bridge),
    unsubscribe: bridge.unsubscribe.bind(bridge),
  };
}
