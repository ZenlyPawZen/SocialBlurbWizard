import { useState, useEffect, useCallback } from 'react';

const SESSION_STORAGE_KEY = 'socialwizard_cache';

interface CacheData {
  blurb: string;
  hashtags: string;
  cta: string;
  optimizedContent: Record<string, string>;
  timestamp: number;
}

export function useSessionCache() {
  const [cache, setCache] = useState<CacheData>({
    blurb: '',
    hashtags: '',
    cta: '',
    optimizedContent: {},
    timestamp: Date.now()
  });

  // Load from session storage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        const parsedCache = JSON.parse(stored) as CacheData;
        setCache(parsedCache);
      }
    } catch (error) {
      console.warn('Failed to load session cache:', error);
    }
  }, []);

  // Save to session storage whenever cache changes
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(cache));
    } catch (error) {
      console.warn('Failed to save session cache:', error);
    }
  }, [cache]);

  // Clear cache when tab is closing
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      } catch (error) {
        // Ignore errors during page unload
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const updateContent = useCallback((blurb: string, hashtags: string, cta: string) => {
    setCache(prevCache => {
      const contentChanged = prevCache.blurb !== blurb;
      return {
        blurb,
        hashtags,
        cta,
        // Clear optimized content if blurb changed
        optimizedContent: contentChanged ? {} : prevCache.optimizedContent,
        timestamp: Date.now()
      };
    });
  }, []);

  const updateOptimizedContent = useCallback((platform: string, content: string) => {
    setCache(prevCache => ({
      ...prevCache,
      optimizedContent: {
        ...prevCache.optimizedContent,
        [platform]: content
      },
      timestamp: Date.now()
    }));
  }, []);

  const clearCache = useCallback(() => {
    const newCache: CacheData = {
      blurb: '',
      hashtags: '',
      cta: '',
      optimizedContent: {},
      timestamp: Date.now()
    };
    setCache(newCache);
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear session cache:', error);
    }
  }, []);

  return {
    ...cache,
    updateContent,
    updateOptimizedContent,
    clearCache
  };
}