import { timeEngine } from "../time/timeEngine"

export function attachTimeBridge() {
  return {
    seek: (v: number) => timeEngine.seek(v),
    getTimeline: () => timeEngine.getTimeline(),
    getPosition: () => timeEngine.getPosition(),
  }
}
