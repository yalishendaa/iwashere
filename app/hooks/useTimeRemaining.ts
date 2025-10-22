import { useState, useEffect } from 'react';

/**
 * Formats seconds into a human-readable time string
 * @param seconds Number of seconds
 * @returns Formatted time string (e.g., "2h 30m 15s" or "0s")
 */
export function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) return '0s';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0) parts.push(`${secs}s`);
  
  return parts.join(' ') || '0s';
}

/**
 * Hook to get time remaining until a target timestamp
 * @param targetTimestamp Target timestamp in seconds
 * @param refreshInterval Refresh interval in milliseconds (default: 1000)
 * @returns Object with timeRemaining (seconds) and formatted string
 */
export function useTimeRemaining(
  targetTimestamp: number,
  refreshInterval: number = 1000
) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [formatted, setFormatted] = useState<string>('0s');

  useEffect(() => {
    const updateTime = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = Math.max(0, targetTimestamp - now);
      setTimeRemaining(remaining);
      setFormatted(formatTimeRemaining(remaining));
    };

    updateTime(); // Initial update

    const interval = setInterval(updateTime, refreshInterval);
    return () => clearInterval(interval);
  }, [targetTimestamp, refreshInterval]);

  return { timeRemaining, formatted };
}
