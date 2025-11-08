export function measureFPS(callback: (fps: number) => void) {
  let lastFrame = performance.now();
  let frames = 0;

  function loop() {
    frames++;
    const now = performance.now();
    if (now - lastFrame >= 1000) {
      callback(frames);
      frames = 0;
      lastFrame = now;
    }
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

export function getMemoryUsage(): number {
  if ((performance as any).memory) {
    const memory = (performance as any).memory;
    return parseFloat((memory.usedJSHeapSize / 1048576).toFixed(2));
  }
  return 0;
}

