import { useEffect, useState } from "react";
import { PerformanceMetrics } from "@/lib/types";

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    renderTime: 0,
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 0;

    const measure = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = now;

        const memory =
          (performance as any).memory?.usedJSHeapSize / 1048576 || 0;
        setMetrics({
          fps,
          memoryUsage: parseFloat(memory.toFixed(2)),
          renderTime: Math.random() * 5 + 1000,
        });
      }
      requestAnimationFrame(measure);
    };

    requestAnimationFrame(measure);
    return () => cancelAnimationFrame(measure as any);
  }, []);

  return metrics;
}
