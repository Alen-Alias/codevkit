import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore write errors
    }
  }, [key, value]);

  return [value, setValue];
}

export const STORAGE_KEYS = {
  FAVORITES: 'codevkit:favorites',
  RECENTS: 'codevkit:recents',
  THEME: 'codevkit:theme',
  TOOL_STATE: 'codevkit:tool-state',
  JSON_INDENT: 'codevkit:json-indent',
} as const;
