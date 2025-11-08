"use client";
import { useState } from "react";

export default function TimeRangeSelector({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const [value, setValue] = useState("1m");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col text-white">
      <label className="text-xs text-gray-400">Aggregation</label>
      <select
        value={value}
        onChange={handleChange}
        className="bg-gray-700 rounded px-2 py-1"
      >
        <option value="1m">1 minute</option>
        <option value="5m">5 minutes</option>
        <option value="1h">1 hour</option>
      </select>
    </div>
  );
}
