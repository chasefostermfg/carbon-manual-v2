import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export interface Column {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  /** Render as monospace (e.g. part numbers, IDs). */
  mono?: boolean;
  className?: string;
}

/**
 * A Carbon-style list/table view. Pass `columns` and `rows`; cell values may be
 * strings, numbers, or React nodes (e.g. <StatusBadge>). Mirrors the dense data
 * grids used throughout the Carbon app.
 *
 * Usage in MDX:
 *   <DataTable
 *     columns={[{key:'id',label:'Part',mono:true},{key:'name',label:'Description'}]}
 *     rows={[{id:'PART-001', name:'…'}]} />
 */
export function DataTable({
  columns,
  rows,
  className,
}: {
  columns: Column[];
  rows: Array<Record<string, ReactNode>>;
  className?: string;
}) {
  const alignClass = (a?: Column["align"]) =>
    a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left";
  return (
    <div
      className={cn(
        "not-prose overflow-x-auto rounded-lg border border-fd-border",
        className,
      )}
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-fd-border bg-fd-muted/40">
            {columns.map((c) => (
              <th
                key={c.key}
                className={cn(
                  "px-3 py-2 text-xs font-semibold tracking-wide text-fd-muted-foreground uppercase",
                  alignClass(c.align),
                )}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-fd-border/60 last:border-0 hover:bg-fd-muted/30"
            >
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={cn(
                    "px-3 py-2 align-middle text-fd-foreground",
                    alignClass(c.align),
                    c.mono && "font-mono text-[0.82rem]",
                    c.className,
                  )}
                >
                  {row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
