import { useEffect, useState } from "react";

// One request per page load, shared by every component that shows the count.
let request: Promise<number | null> | null = null;

const loadVisitorCount = () => {
  request ??= fetch("/api/visitors")
    .then(async (response) => {
      const result: { ok?: boolean; visitors?: number } = await response.json();
      return response.ok && result.ok && typeof result.visitors === "number" ? result.visitors : null;
    })
    .catch((error) => {
      console.warn("Visitor counter unavailable:", error);
      return null;
    });
  return request;
};

/** Unique visitor total from `/api/visitors`, or null while loading / if not configured. */
export const useVisitorCount = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadVisitorCount().then((value) => {
      if (!cancelled) setCount(value);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return count;
};
