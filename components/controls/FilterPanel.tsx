"use client";
import { useState } from "react";

export default function FilterPanel({
  onFilterChange,
}: {
  onFilterChange: (filters: {
    range: string;
    category: string;
    aggregation: string;
  }) => void;
}) {
  const [range, setRange] = useState("1m");
  const [category, setCategory] = useState("performance");
  const [aggregation, setAggregation] = useState("1min");

  const applyFilters = () =>
    onFilterChange({ range, category, aggregation });

  return (
    <div className="flex flex-wrap gap-3 items-center bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md">
      <div className="flex flex-col">
        <label className="text-xs text-gray-400">Time Range</label>
        <select
          className="bg-gray-700 rounded px-2 py-1"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="1d">Last 24h</option>
          <option value="1w">Last 7 days</option>
          <option value="1m">Last 30 days</option>
          <option value="3m">Last 90 days</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-400">Category</label>
        <select
          className="bg-gray-700 rounded px-2 py-1"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="performance">Performance</option>
          <option value="network">Network</option>
          <option value="memory">Memory</option>
          <option value="storage">Storage</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-400">Aggregation</label>
        <select
          className="bg-gray-700 rounded px-2 py-1"
          value={aggregation}
          onChange={(e) => setAggregation(e.target.value)}
        >
          <option value="1min">1 min</option>
          <option value="5min">5 min</option>
          <option value="1hr">1 hour</option>
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
      >
        Apply
      </button>
    </div>
  );
}
