"use client";
import { useChartRenderer } from "@/hooks/useChartRenderer";
import { resizeCanvasToDisplaySize, drawAxis } from "@/lib/canvasUtils";
import { DataPoint } from "@/lib/types";

export default function BarChart({ data }: { data: DataPoint[] }) {
  const canvasRef = useChartRenderer((ctx) => {
    const canvas = ctx.canvas;
    resizeCanvasToDisplaySize(canvas);

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    drawAxis(ctx, w, h);

    if (data.length === 0) return;

    const barWidth = w / data.length;
    const maxVal = Math.max(...data.map((d) => d.value));
    const minVal = Math.min(...data.map((d) => d.value));
    const range = maxVal - minVal || 1;

    ctx.fillStyle = "#60A5FA"; // light blue bars

    data.forEach((point, i) => {
      const x = i * barWidth;
      const barHeight = ((point.value - minVal) / range) * h;
      ctx.fillRect(x, h - barHeight, barWidth * 0.8, barHeight);
    });
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      className="border border-gray-700 rounded-lg bg-black"
    />
  );
}
