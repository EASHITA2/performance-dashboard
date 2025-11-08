"use client";
import { useEffect, useRef } from "react";

/**
 * A lightweight hook for canvas-based chart rendering.
 * Automatically handles resizing and re-rendering efficiently.
 */
export function useChartRenderer(
  draw: (ctx: CanvasRenderingContext2D, frame: number) => void,
  dependencies: any[] = []
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let running = true;

    const render = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw(ctx, frame++);
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      running = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, dependencies);

  return canvasRef;
}
