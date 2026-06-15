import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Tone =
  | "neutral"
  | "blue"
  | "green"
  | "amber"
  | "red"
  | "purple"
  | "gray";

const toneClass: Record<Tone, string> = {
  neutral:
    "bg-fd-muted text-fd-muted-foreground ring-fd-border",
  gray: "bg-fd-muted text-fd-muted-foreground ring-fd-border",
  blue: "bg-blue-500/10 text-blue-600 ring-blue-500/20 dark:text-blue-400",
  green:
    "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400",
  amber:
    "bg-amber-500/10 text-amber-600 ring-amber-500/25 dark:text-amber-400",
  red: "bg-red-500/10 text-red-600 ring-red-500/20 dark:text-red-400",
  purple:
    "bg-purple-500/10 text-purple-600 ring-purple-500/20 dark:text-purple-400",
};

/**
 * A small status pill that mirrors Carbon's status indicators
 * (e.g. Draft, Confirmed, In Progress, Completed).
 */
export function StatusBadge({
  children,
  tone = "neutral",
  dot = true,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}) {
  const dotColor: Record<Tone, string> = {
    neutral: "bg-fd-muted-foreground/60",
    gray: "bg-fd-muted-foreground/60",
    blue: "bg-blue-500",
    green: "bg-emerald-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset whitespace-nowrap",
        toneClass[tone],
        className,
      )}
    >
      {dot ? (
        <span className={cn("size-1.5 rounded-full", dotColor[tone])} />
      ) : null}
      {children}
    </span>
  );
}

/** A simple inline tag/chip, e.g. for item types or labels. */
export function Tag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-fd-border bg-fd-card px-1.5 py-0.5 font-mono text-[0.72rem] text-fd-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
