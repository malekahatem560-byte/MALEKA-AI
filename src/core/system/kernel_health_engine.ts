export type KernelHealth =
| 'HEALTHY'
| 'DEGRADED'
| 'CRITICAL';

export class KernelHealthEngine {
public evaluate(
cpu: number,
memory: number
): KernelHealth {

if (cpu >= 90 || memory >= 90) {
  return 'CRITICAL';
}

if (cpu >= 70 || memory >= 75) {
  return 'DEGRADED';
}

return 'HEALTHY';

}
}
