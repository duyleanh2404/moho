import { useEffect, useState, useCallback } from 'react';

export function useCountdown(seconds: number) {
  const [count, setCount] = useState(0);

  const start = useCallback(() => {
    setCount(seconds);
  }, [seconds]);

  useEffect(() => {
    if (count === 0) return;

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  return { count, start, isCounting: count > 0 };
}
