"use client";
import { useEffect, useRef, useState } from "react";
import { DataPoint } from "@/lib/types";

export default function HeatmapChart({ data }: { data: DataPoint[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [view, setView] = useState({ scale: 1, offsetX: 0, offsetY: 0 });

  const resetView = () => setView({ scale: 1, offsetX: 0, offsetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(view.offsetX, view.offsetY);
    ctx.scale(view.scale, view.scale);

    const cellSize = 10;
    data.slice(-1000).forEach((point, i) => {
      const x = (i * cellSize) % w;
      const y = Math.floor(i / (w / cellSize)) * cellSize;
      const intensity = Math.min(255, Math.abs(point.value * 3));
      ctx.fillStyle = `rgb(${intensity}, ${255 - intensity}, 100)`;
      ctx.fillRect(x, y, cellSize, cellSize);
    });

    ctx.restore();
  }, [data, view]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="border border-gray-700 rounded-lg bg-black"
      />
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={() => setView((v) => ({ ...v, scale: v.scale * 1.1 }))}
          className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded transition"
          title="Zoom In"
        >
          ➕
        </button>
        <button
          onClick={() => setView((v) => ({ ...v, scale: v.scale / 1.1 }))}
          className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded transition"
          title="Zoom Out"
        >
          ➖
        </button>
        <button
          onClick={resetView}
          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded transition"
          title="Reset View"
        >
          🔄
        </button>
      </div>
    </div>
  );
}
