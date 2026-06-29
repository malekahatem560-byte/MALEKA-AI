export class TimeEngine {
  private position = 0
  private timeline: any[] = []

  seek(v: number) {
    this.position = v
  }

  push(event: any) {
    this.timeline.push(event)
  }

  getTimeline() {
    return this.timeline
  }

  getPosition() {
    return this.position
  }
}

export const timeEngine = new TimeEngine()
