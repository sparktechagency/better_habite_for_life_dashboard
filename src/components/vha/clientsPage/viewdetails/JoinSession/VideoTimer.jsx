"use client";
import { useEffect, useState } from "react";

export default function VideoTimer({ startTime, isExtended }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startTime || isExtended) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((now - startTime) / 1000);
      setElapsed(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isExtended]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="text-xs text-gray-400 mt-1">{formatTime(elapsed)}</div>
  );
}
