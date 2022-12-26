class Interrval {
  constructor(callbackFn, time) {
    this.intervalLimit = time;
    this.callbackFn = callbackFn;
    this.timeId = setInterval(this.callbackFn, time);
  }

  clear() {
    clearInterval(this.timeId);
  }

  restart() {
    this.timeId = setInterval(this.callbackFn, this.intervalLimit);
  }
}
