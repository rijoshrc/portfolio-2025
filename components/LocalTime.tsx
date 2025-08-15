"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export default function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: site.timezone,
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {time || "--:--"} IST
    </span>
  );
}
