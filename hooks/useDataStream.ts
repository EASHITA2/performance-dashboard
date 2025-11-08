"use client";
import { useEffect, useRef, useState } from "react";
import { DataPoint } from "@/lib/types";

interface Filters {
  range: string;
  category: string;
  aggregation?: string;
}

export function useDataStream(filters?: Filters) {
  const [data, setData] = useState<DataPoint[]>([]);
  const frameRef = useRef<number | null>(null);
  const counter = useRef<number>(0);
  const isActiveRef = useRef(true);

  // store filters in a ref so the generator can access live values
  const filterRef = useRef<Filters>({
    range: "1m",
    category: "performance",
    aggregation: "1m",
  });

  useEffect(() => {
    filterRef.current = {
      range: filters?.range || "1m",
      category: filters?.category || "performance",
      aggregation: filters?.aggregation || "1m",
    };
  }, [filters]);

  useEffect(() => {
    const rangeSettings: Record<
      "1d" | "1w" | "1m" | "3m",
      { speed: number; noise: number }
    > = {
      "1d": { speed: 8, noise: 5 },
      "1w": { speed: 6, noise: 10 },
      "1m": { speed: 4, noise: 20 },
      "3m": { speed: 2, noise: 30 },
    };

    const aggregationMap: Record<string, number> = {
      "1m": 1,
      "5m": 5,
      "1h": 30,
    };

    const generatePoint = () => {
      if (!isActiveRef.current) return;

      const f = filterRef.current;
      const { speed, noise } =
        rangeSettings[(f.range as keyof typeof rangeSettings) || "1m"];
      const aggregateFactor = aggregationMap[f.aggregation || "1m"];

      let baseValue = Math.sin(counter.current / speed) * 40;

      switch (f.category) {
        case "network":
          baseValue += Math.random() * noise + 30;
          break;
        case "memory":
          baseValue += Math.cos(counter.current / 15) * 25 + Math.random() * noise;
          break;
        case "storage":
          baseValue += (Math.random() - 0.5) * noise * 2;
          break;
        default:
          baseValue += Math.sin(counter.current / 10) * 50 + Math.random() * noise;
          break;
      }

      const nextPoint: DataPoint = {
        timestamp: counter.current++,
        value: baseValue,
        category: f.category,
      };

      if (counter.current % aggregateFactor === 0) {
        setData((prev) => [...prev.slice(-500), nextPoint]);
      }

      frameRef.current = requestAnimationFrame(generatePoint);
    };

    isActiveRef.current = true;
    frameRef.current = requestAnimationFrame(generatePoint);

    return () => {
      isActiveRef.current = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []); // only run once, never recreate loop

  return data;
}
