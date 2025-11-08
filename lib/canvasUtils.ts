/**
 * Utility helpers for working with HTML Canvas efficiently
 * Used by chart components for consistent rendering behavior.
 */

export function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  const { width, height } = canvas.getBoundingClientRect();
  const needResize =
    canvas.width !== Math.round(width) || canvas.height !== Math.round(height);
  if (needResize) {
    canvas.width = Math.round(width);
    canvas.height = Math.round(height);
  }
  return needResize;
}

export function drawAxis(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, height);
  ctx.stroke();
}

export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color = "#ccc",
  size = 12
) {
  ctx.fillStyle = color;
  ctx.font = `${size}px monospace`;
  ctx.fillText(text, x, y);
}
