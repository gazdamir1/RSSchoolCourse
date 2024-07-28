import { useState, useEffect } from "react";

const useSearchQuery = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? saved : initialValue;
  });

  useEffect(() => {
    return () => {
      localStorage.setItem(key, value);
    };
  }, [key, value]);

  return [value, setValue] as const;
};

export default useSearchQuery;
