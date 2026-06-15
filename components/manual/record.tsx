import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/**
 * RecordPanel renders a Carbon-style detail view: an optional header (title +
 * status), an optional non-interactive tab strip, and a body. Use with <FieldGrid>
 * and <Field> to lay out the record's fields like the app's detail forms.
 */
export function RecordPanel({
  title,
  subtitle,
  status,
  tabs,
  activeTab,
  children,
  className,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  status?: ReactNode;
  tabs?: string[];
  activeTab?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "not-prose overflow-hidden rounded-lg border border-fd-border bg-fd-card",
        className,
      )}
    >
      {(title || status) && (
        <div className="flex items-start justify-between gap-3 border-b border-fd-border px-4 py-3">
          <div className="min-w-0">
            {title ? (
              <div className="font-semibold text-fd-foreground">{title}</div>
            ) : null}
            {subtitle ? (
              <div className="mt-0.5 text-sm text-fd-muted-foreground">
                {subtitle}
              </div>
            ) : null}
          </div>
          {status ? <div className="shrink-0">{status}</div> : null}
        </div>
      )}
      {tabs && tabs.length > 0 ? (
        <div className="flex flex-wrap gap-1 border-b border-fd-border px-2 pt-2">
          {tabs.map((t) => {
            const active = (activeTab ?? tabs[0]) === t;
            return (
              <span
                key={t}
                className={cn(
                  "rounded-t-md px-3 py-1.5 text-sm",
                  active
                    ? "border-b-2 border-fd-primary font-medium text-fd-foreground"
                    : "text-fd-muted-foreground",
                )}
              >
                {t}
              </span>
            );
          })}
        </div>
      ) : null}
      <div className="p-4">{children}</div>
    </div>
  );
}

/** Responsive grid of fields. `cols` controls columns on wider screens. */
export function FieldGrid({
  children,
  cols = 2,
  className,
}: {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  const colClass = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[cols];
  return (
    <dl className={cn("grid grid-cols-1 gap-x-6 gap-y-4", colClass, className)}>
      {children}
    </dl>
  );
}

/** A labelled field/value pair, mirroring Carbon's form fields. */
export function Field({
  label,
  value,
  mono,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  mono?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <dt className="text-xs font-medium tracking-wide text-fd-muted-foreground uppercase">
        {label}
      </dt>
      <dd
        className={cn(
          "mt-1 text-sm text-fd-foreground",
          mono && "font-mono text-[0.82rem]",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
