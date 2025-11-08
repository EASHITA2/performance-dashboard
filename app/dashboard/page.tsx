"use client";

import { useState } from "react";
import { useDataStream } from "@/hooks/useDataStream";

// Charts
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import ScatterPlot from "@/components/charts/ScatterPlot";
import HeatmapChart from "@/components/charts/HeatmapChart";

// UI Components
import FilterPanel from "@/components/controls/FilterPanel";
import DataTable from "@/components/ui/DataTable";
import PerformanceMonitor from "@/components/ui/PerformanceMonitor";

type ViewType = "line" | "bar" | "scatter" | "heatmap";

export default function DashboardPage() {
  const [filters, setFilters] = useState({
    range: "1m",
    category: "performance",
  });
  const [view, setView] = useState<ViewType>("line");

  const data = useDataStream(filters);

  return (
    <div className="p-6 space-y-6">
      {/* === Header Section === */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📊 Real-Time Performance Dashboard</h1>
        <div className="space-x-2">
          {["line", "bar", "scatter", "heatmap"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as ViewType)}
              className={`px-3 py-1 rounded capitalize transition ${
                view === v ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* === Filters === */}
      <FilterPanel
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
          console.log("Filters applied:", newFilters);
        }}
      />

      {/* === Dynamic Chart View === */}
      <div className="border border-gray-800 rounded-lg bg-black relative p-2">
        {view === "line" && <LineChart data={data} />}
        {view === "bar" && <BarChart data={data} />}
        {view === "scatter" && <ScatterPlot data={data} />}
        {view === "heatmap" && <HeatmapChart data={data} />}
      </div>

      {/* === Live Data Table === */}
      <DataTable data={data} />

      {/* === Performance Monitor === */}
      <PerformanceMonitor />
    </div>
  );
}
