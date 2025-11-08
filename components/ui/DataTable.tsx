"use client";
import { useVirtualization } from "@/hooks/useVirtualization";
import { DataPoint } from "@/lib/types";

export default function DataTable({ data }: { data: DataPoint[] }) {
  const rowHeight = 28;
  const windowHeight = 300;

  const { containerRef, visibleItems, offsetY, totalHeight } =
    useVirtualization<DataPoint>({
      items: data,
      itemHeight: rowHeight,
      windowHeight,
    });

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">📋 Live Data Table</h2>
      <div
        ref={containerRef}
        style={{
          height: `${windowHeight}px`,
          overflowY: "auto",
          position: "relative",
        }}
        className="border border-gray-700 rounded-lg bg-gray-900"
      >
        <div style={{ height: totalHeight + "px", position: "relative" }}>
          <div
            style={{
              transform: `translateY(${offsetY}px)`,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            {visibleItems.map((point, i) => (
              <div
                key={i}
                className="grid grid-cols-3 text-sm text-gray-300 border-b border-gray-800 px-3 py-1 hover:bg-gray-800/50 transition"
                style={{ height: rowHeight }}
              >
                <div>{point.timestamp}</div>
                <div>{point.category}</div>
                <div>{point.value.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
