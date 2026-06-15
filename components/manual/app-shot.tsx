import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/**
 * AppShot wraps illustrative UI in a browser-style window chrome so it reads as a
 * screenshot of the Carbon app. Content is rendered with real demo data, so it
 * stays crisp, theme-aware (light/dark) and never goes stale.
 *
 * Usage in MDX:
 *   <AppShot title="Sales Orders" url="app.carbon.ms/x/sales-order">
 *     <DataTable .../>
 *   </AppShot>
 */
export function AppShot({
  children,
  title,
  url,
  caption,
  className,
  bodyClassName,
  flush = false,
}: {
  children: ReactNode;
  title?: string;
  url?: string;
  caption?: ReactNode;
  className?: string;
  bodyClassName?: string;
  /** Remove body padding (for full-bleed tables). */
  flush?: boolean;
}) {
  return (
    <figure className={cn("my-6 not-prose", className)}>
      <div className="overflow-hidden rounded-xl border border-fd-border bg-fd-card shadow-sm">
        {/* window bar */}
        <div className="flex items-center gap-2 border-b border-fd-border bg-fd-muted/50 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-red-400/80" />
            <span className="size-3 rounded-full bg-amber-400/80" />
            <span className="size-3 rounded-full bg-emerald-400/80" />
          </div>
          {url ? (
            <div className="ml-2 flex min-w-0 flex-1 items-center justify-center">
              <div className="flex max-w-full items-center gap-1.5 truncate rounded-md border border-fd-border bg-fd-background px-2.5 py-1 text-xs text-fd-muted-foreground">
                <LockIcon />
                <span className="truncate">{url}</span>
              </div>
            </div>
          ) : (
            <div className="flex-1" />
          )}
          <div className="w-12" />
        </div>
        {/* optional app title bar */}
        {title ? (
          <div className="flex items-center justify-between border-b border-fd-border px-4 py-2.5">
            <span className="text-sm font-semibold text-fd-foreground">
              {title}
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <span className="rounded-md bg-fd-foreground px-2 py-1 text-xs font-medium text-fd-background">
                Save
              </span>
            </span>
          </div>
        ) : null}
        <div className={cn(flush ? "" : "p-4", bodyClassName)}>{children}</div>
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-fd-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-3 shrink-0 opacity-70"
      aria-hidden
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
