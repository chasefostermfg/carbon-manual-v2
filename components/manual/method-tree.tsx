import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type NodeKind = "assembly" | "operation" | "material" | "part" | "fixture";

export interface MethodNode {
  kind: NodeKind;
  /** Part number / operation name / work center. */
  label: ReactNode;
  /** Secondary text, e.g. description or work center. */
  detail?: ReactNode;
  /** Quantity + unit, e.g. "4 EA" or "0.5 hr". */
  qty?: ReactNode;
  children?: MethodNode[];
}

const kindMeta: Record<NodeKind, { tag: string; cls: string }> = {
  assembly: { tag: "Make", cls: "text-emerald-600 dark:text-emerald-400" },
  operation: { tag: "Op", cls: "text-blue-600 dark:text-blue-400" },
  material: { tag: "Material", cls: "text-amber-600 dark:text-amber-400" },
  part: { tag: "Buy", cls: "text-fd-muted-foreground" },
  fixture: { tag: "Fixture", cls: "text-purple-600 dark:text-purple-400" },
};

/**
 * MethodTree renders a manufacturing method (the bill of materials + routing)
 * as an indented tree — the "method tree" shown on items and jobs in Carbon.
 */
export function MethodTree({
  nodes,
  className,
}: {
  nodes: MethodNode[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "not-prose overflow-hidden rounded-lg border border-fd-border bg-fd-card p-2 text-sm",
        className,
      )}
    >
      <ul className="space-y-0.5">
        {nodes.map((n, i) => (
          <TreeRow key={i} node={n} depth={0} />
        ))}
      </ul>
    </div>
  );
}

function TreeRow({ node, depth }: { node: MethodNode; depth: number }) {
  const meta = kindMeta[node.kind];
  return (
    <li>
      <div
        className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-fd-muted/40"
        style={{ paddingLeft: `${depth * 1.25 + 0.5}rem` }}
      >
        <span
          className={cn(
            "w-16 shrink-0 text-[0.68rem] font-semibold tracking-wide uppercase",
            meta.cls,
          )}
        >
          {meta.tag}
        </span>
        <span className="font-mono text-[0.82rem] text-fd-foreground">
          {node.label}
        </span>
        {node.detail ? (
          <span className="truncate text-fd-muted-foreground">
            — {node.detail}
          </span>
        ) : null}
        {node.qty ? (
          <span className="ml-auto shrink-0 font-mono text-xs text-fd-muted-foreground">
            {node.qty}
          </span>
        ) : null}
      </div>
      {node.children && node.children.length > 0 ? (
        <ul className="space-y-0.5">
          {node.children.map((c, i) => (
            <TreeRow key={i} node={c} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
