"use client";
import { useRef, useEffect, useState } from "react";
import { DataPoint } from "@/lib/types";

export default function LineChart({ data }: { data: DataPoint[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [view, setView] = useState({ scale: 1, offsetX: 0, offsetY: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

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

    ctx.beginPath();
    ctx.strokeStyle = "#4ADE80";
    ctx.lineWidth = 2;

    data.forEach((point, i) => {
      const x = i * 5;
      const y = h / 2 - point.value * 2;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.restore();
  }, [data, view]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setView((v) => ({
        ...v,
        scale: e.deltaY < 0 ? v.scale * 1.1 : v.scale / 1.1,
      }));
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsPanning(true);
      setStartPan({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPanning) return;
      setView((v) => ({
        ...v,
        offsetX: v.offsetX + (e.clientX - startPan.x),
        offsetY: v.offsetY + (e.clientY - startPan.y),
      }));
      setStartPan({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => setIsPanning(false);

    canvas.addEventListener("wheel", handleWheel);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isPanning, startPan]);

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
