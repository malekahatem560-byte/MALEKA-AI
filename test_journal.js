import { DurableAppendLog } from './src/event_sourcing/journal/durable_append_log';
async function verifyLog() {
    const log = new DurableAppendLog('./data', 'test-node');
    await log.append('test-partition', 'agg-1', 'TestEvent', 1, { data: 'test-payload' });
    await log.replay('test-partition', async (event) => {
        console.log('Verified Event:', JSON.stringify(event, (k, v) => typeof v === 'bigint' ? v.toString() : v));
    });
}
verifyLog().catch(console.error);
