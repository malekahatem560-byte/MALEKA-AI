import { patchBigIntSerialization } from './src/utils/json_bigint_fix';
patchBigIntSerialization();

import { MalekaEngine } from './src/core/maleka_engine';
const system = new MalekaEngine();
system.bootstrap().catch(console.error);
