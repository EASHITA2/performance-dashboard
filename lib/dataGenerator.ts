import { DataPoint } from "./types";

export function generateData(count: number): DataPoint[] {
  const data: DataPoint[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      timestamp: Date.now() - (count - i) * 1000,
      value: Math.sin(i / 10) * 50 + Math.random() * 20,
      category: ["network", "memory", "storage", "performance"][i % 4],
    });
  }
  return data;
}
