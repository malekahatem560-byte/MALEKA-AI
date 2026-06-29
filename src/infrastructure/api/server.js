"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupInfrastructure = setupInfrastructure;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const websocket_gateway_1 = require("../ws/websocket_gateway");
const studio_routes_1 = require("../../studio/api/studio_routes");
function setupInfrastructure(bus, orchestrator) {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.static('public'));
    (0, studio_routes_1.registerStudioRoutes)(app);
    (0, studio_routes_1.registerStudioRoutes)(app);
    (0, studio_routes_1.registerStudioRoutes)(app);
    app.get('/', (_, res) => {
        res.json({
            system: 'MALEKA',
            status: 'ONLINE',
            version: 'V2'
        });
    });
    app.get('/health', (_, res) => {
        res.json({
            status: 'healthy',
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            cpu: process.cpuUsage()
        });
    });
    app.get('/telemetry', (_, res) => {
        res.json({
            timestamp: Date.now(),
            memory: process.memoryUsage(),
            cpu: process.cpuUsage(),
            uptime: process.uptime()
        });
    });
    app.get('/agents', (_, res) => {
        if (!orchestrator) {
            return res.json({
                status: 'orchestrator_not_attached'
            });
        }
        res.json({
            totalAgents: orchestrator.registry.count(),
            agents: orchestrator.registry.getAgentIds()
        });
    });
    app.get("/kernel", (_, res) => {
        res.json({
            status: "ONLINE",
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            cpu: process.cpuUsage(),
            pid: process.pid,
            platform: process.platform,
            node: process.version
        });
    });
    app.get("/runtime", (_, res) => {
        res.json({
            status: "RUNNING",
            timestamp: Date.now(),
            uptime: process.uptime()
        });
    });
    const httpServer = (0, http_1.createServer)(app);
    new websocket_gateway_1.WebSocketGateway(bus, httpServer);
    return httpServer;
}
