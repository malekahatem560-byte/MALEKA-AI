"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventBusProxy = createEventBusProxy;
const event_bridge_1 = require("./event_bridge");
function createEventBusProxy(bus) {
    const bridge = new event_bridge_1.EventBridge(bus);
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
