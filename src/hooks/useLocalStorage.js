import { useEffect, useState } from "react";

/**
 * useState that persists to localStorage.
 * - Reads saved JSON on first render; falls back to `initialValue` if nothing is saved,
 *   the JSON is corrupt, storage is blocked, or `isValid(parsed)` fails.
 * - Saved data always wins over `initialValue`, so sample data never overwrites it.
 */
export default function useLocalStorage(key, initialValue, isValid = () => true) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return initialValue;
      const parsed = JSON.parse(raw);
      return isValid(parsed) ? parsed : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable or full: the app keeps working in memory */
    }
  }, [key, value]);

  return [value, setValue];
}