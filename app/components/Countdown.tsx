"use client";

import { useEffect, useState } from "react";

const LAUNCH_TARGET = Date.UTC(2026, 7, 14, 18, 30, 0);

type CountdownValues = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

function getCountdownValues(now: number): CountdownValues {
  const diff = Math.max(0, LAUNCH_TARGET - now);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number, width = 2) => String(value).padStart(width, "0");

  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}

const units = [
  { key: "days" as const, label: "Days", shortLabel: "Days", highlight: false },
  { key: "hours" as const, label: "Hours", shortLabel: "Hrs", highlight: false },
  {
    key: "minutes" as const,
    label: "Minutes",
    shortLabel: "Min",
    highlight: false,
  },
  {
    key: "seconds" as const,
    label: "Seconds",
    shortLabel: "Sec",
    highlight: true,
  },
];

export default function Countdown() {
  const [values, setValues] = useState<CountdownValues | null>(null);

  useEffect(() => {
    const update = () => setValues(getCountdownValues(Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!values) {
    return (
      <div className="mt-8 grid w-full max-w-3xl grid-cols-4 gap-2 sm:mt-12 sm:gap-4 lg:mt-[50px] lg:gap-[18px]">
        {units.map((unit) => (
          <div
            key={unit.key}
            className="rounded-xl border border-white/8 bg-white/4 px-2 py-4 sm:rounded-[14px] sm:px-4 sm:py-5 lg:py-[26px]"
          >
            <div className="font-display text-2xl font-bold tabular-nums text-white sm:text-4xl lg:text-[54px]">
              --
            </div>
            <div className="mt-2 font-mono text-[9px] tracking-[0.14em] text-muted-dark uppercase sm:mt-3 sm:text-[11px] sm:tracking-[0.2em]">
              <span className="sm:hidden">{unit.shortLabel}</span>
              <span className="hidden sm:inline">{unit.label}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 grid w-full max-w-3xl grid-cols-4 gap-2 sm:mt-12 sm:gap-4 lg:mt-[50px] lg:gap-[18px]">
      {units.map((unit) => (
        <div
          key={unit.key}
          className={`rounded-xl border px-2 py-4 text-center sm:rounded-[14px] sm:px-4 sm:py-5 lg:py-[26px] ${
            unit.highlight
              ? "border-accent/30 bg-accent/8"
              : "border-white/8 bg-white/4"
          }`}
        >
          <div
            className={`font-display text-2xl leading-none font-bold tracking-[-0.02em] tabular-nums sm:text-4xl lg:text-[54px] ${
              unit.highlight ? "text-accent" : "text-white"
            }`}
          >
            {values[unit.key]}
          </div>
          <div
            className={`mt-2 font-mono text-[9px] tracking-[0.14em] uppercase sm:mt-3 sm:text-[11px] sm:tracking-[0.2em] ${
              unit.highlight ? "text-[#5f9dae]" : "text-muted-dark"
            }`}
          >
            <span className="sm:hidden">{unit.shortLabel}</span>
            <span className="hidden sm:inline">{unit.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
