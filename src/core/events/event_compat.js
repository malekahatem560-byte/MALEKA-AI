"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachLegacyAPI = attachLegacyAPI;
function attachLegacyAPI(bus) {
    const anyBus = bus;
    anyBus.subscribe = anyBus.subscribe || bus.on.bind(bus);
    anyBus.unsubscribe = anyBus.unsubscribe || bus.off.bind(bus);
    anyBus.publish = anyBus.publish || bus.emit.bind(bus);
    return bus;
}
