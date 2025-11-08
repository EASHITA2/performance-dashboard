"use client";
import { createContext, useContext, useState } from "react";
import { DataPoint } from "@/lib/types";

const DataContext = createContext<{ data: DataPoint[]; setData: any } | null>(null);

export function DataProvider({
  children,
  initialData = [],
}: {
  children: React.ReactNode;
  initialData?: DataPoint[];
}) {
  const [data, setData] = useState<DataPoint[]>(initialData);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};
