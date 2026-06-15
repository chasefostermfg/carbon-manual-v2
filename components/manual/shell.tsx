import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export interface ModuleItem {
  label: string;
  /** Mark the currently-active module. */
  active?: boolean;
}

/**
 * CarbonShell renders a simplified mock of the Carbon app layout — the left
 * module rail, a top bar with search, and a content slot. Used to orient new
 * users on the "Navigating Carbon" page.
 */
export function CarbonShell({
  modules,
  topbar,
  children,
  className,
}: {
  modules: ModuleItem[];
  topbar?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "not-prose grid grid-cols-[170px_1fr] overflow-hidden rounded-lg border border-fd-border bg-fd-card text-sm",
        className,
      )}
    >
      {/* module rail */}
      <div className="border-r border-fd-border bg-fd-muted/30 p-2">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <span className="grid size-5 place-items-center rounded bg-fd-foreground text-[0.6rem] font-bold text-fd-background">
            C
          </span>
          <span className="font-semibold text-fd-foreground">Carbon</span>
        </div>
        <nav className="mt-2 space-y-0.5">
          {modules.map((m) => (
            <div
              key={m.label}
              className={cn(
                "rounded-md px-2 py-1.5",
                m.active
                  ? "bg-fd-foreground/10 font-medium text-fd-foreground"
                  : "text-fd-muted-foreground",
              )}
            >
              {m.label}
            </div>
          ))}
        </nav>
      </div>
      {/* content */}
      <div className="min-w-0">
        <div className="flex items-center gap-2 border-b border-fd-border px-3 py-2">
          <div className="flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-2 py-1 text-xs text-fd-muted-foreground">
            <SearchIcon />
            <span>Search or jump to… ⌘K</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {topbar}
            <span className="grid size-6 place-items-center rounded-full bg-fd-muted text-[0.6rem] font-semibold text-fd-muted-foreground">
              A
            </span>
          </div>
        </div>
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-3 opacity-70"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
