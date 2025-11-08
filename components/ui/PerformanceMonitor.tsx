"use client";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

export default function PerformanceMonitor() {
  const { fps, memoryUsage, renderTime } = usePerformanceMonitor();

  return (
    <div className="fixed bottom-4 left-4 p-3 text-sm rounded-lg bg-gray-900/80 backdrop-blur text-gray-200 shadow-lg border border-gray-700">
      <p>🎯 <strong>FPS:</strong> {fps}</p>
      <p>🧠 <strong>Memory:</strong> {memoryUsage.toFixed(2)} MB</p>
      <p>⚡ <strong>Render Time:</strong> {renderTime.toFixed(1)} ms</p>
    </div>
  );
}
