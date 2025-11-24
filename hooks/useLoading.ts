
import { useState, useEffect } from 'react';

// Global cache to store loaded states during the session
const loadCache: Record<string, boolean> = {};

export const useLoading = (key: string, duration: number = 1000) => {
  // If key exists in cache, we've already loaded this section
  const [isLoading, setIsLoading] = useState(!loadCache[key]);

  useEffect(() => {
    // If already cached, ensure we are false (in case state didn't pick it up immediately)
    if (loadCache[key]) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      loadCache[key] = true;
    }, duration);

    return () => clearTimeout(timer);
  }, [key, duration]);

  return isLoading;
};
