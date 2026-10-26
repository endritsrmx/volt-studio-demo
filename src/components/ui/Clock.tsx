"use client";

import { useEffect, useState } from "react";
import site from "@/config/site";

/** Live local time for the studio's city (config → location). */
export default function Clock({ className }: { className?: string }) {
  const [time, setTime] = useState<string>("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: site.location.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className={className} suppressHydrationWarning>
      {site.location.city.toUpperCase()} - {time}
    </span>
  );
}
