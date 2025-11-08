"use client";
import { useRef, useState, useEffect, useCallback } from "react";

interface VirtualOptions<T> {
  items: T[];
  itemHeight: number;
  windowHeight: number;
  overscan?: number;
}

export function useVirtualization<T>({
  items,
  itemHeight,
  windowHeight,
  overscan = 5,
}: VirtualOptions<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / itemHeight) - overscan
  );
  const endIndex = Math.min(
    items.length,
    Math.ceil((scrollTop + windowHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex);

  const offsetY = startIndex * itemHeight;

  const onScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return { containerRef, visibleItems, offsetY, totalHeight };
}
