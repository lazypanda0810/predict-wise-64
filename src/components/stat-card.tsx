import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let frame = 0;
    const total = 40;
    const id = setInterval(() => {
      frame += 1;
      setDisplay(value * Math.min(1, frame / total));
      if (frame >= total) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [value]);
  return (
    <span>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function StatCard({
  label,
  value,
  suffix,
  decimals,
  icon: Icon,
  trend,
  tone = "primary",
  index = 0,
}: {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  icon: LucideIcon;
  trend?: string;
  tone?: "primary" | "accent" | "warning" | "destructive";
  index?: number;
}) {
  const toneMap = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/12 text-accent",
    warning: "bg-warning/15 text-warning",
    destructive: "bg-destructive/12 text-destructive",
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="surface-card p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">
            <AnimatedCounter value={value} decimals={decimals} suffix={suffix} />
          </p>
          {trend && <p className="mt-1 text-xs text-muted-foreground">{trend}</p>}
        </div>
        <div className={cn("grid size-11 shrink-0 place-items-center rounded-xl", toneMap[tone])}>
          <Icon className="size-5" />
        </div>
      </div>
    </motion.div>
  );
}