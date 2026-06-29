import { EventBus } from '../event_bus';

export function attachLegacyAPI(bus: EventBus) {
  const anyBus = bus as any;

  anyBus.subscribe = anyBus.subscribe || bus.on.bind(bus);
  anyBus.unsubscribe = anyBus.unsubscribe || bus.off.bind(bus);
  anyBus.publish = anyBus.publish || bus.emit.bind(bus);

  return bus;
}
