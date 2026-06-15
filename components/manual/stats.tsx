import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** A grid of KPI/stat tiles, like a Carbon dashboard summary row. */
export function StatGrid({
  children,
  cols = 3,
  className,
}: {
  children: ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}) {
  const colClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
  }[cols];
  return (
    <div
      className={cn(
        "not-prose my-5 grid grid-cols-1 gap-3",
        colClass,
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Stat({
  label,
  value,
  hint,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-fd-border bg-fd-card p-4",
        className,
      )}
    >
      <div className="text-xs font-medium tracking-wide text-fd-muted-foreground uppercase">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold text-fd-foreground tabular-nums">
        {value}
      </div>
      {hint ? (
        <div className="mt-1 text-xs text-fd-muted-foreground">{hint}</div>
      ) : null}
    </div>
  );
}
