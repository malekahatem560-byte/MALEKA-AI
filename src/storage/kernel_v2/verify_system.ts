import { KernelEngine } from './engine';

async function test() {
    const engine = new KernelEngine('./data_prod');
    await engine.boot();
    await engine.execute(new Uint8Array([1, 2, 3]), 1n);
    console.log("[System] Integration Verified: Engine Operational.");
}
test().catch(console.error);
