export interface DataPoint {
  timestamp: number;
  value: number;
  category: string;
}

export interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
}
