import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { BookOpen, Code2 } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      sidebar={{
        tabs: [
          {
            title: "User Manual",
            description: "Learn to use Carbon",
            url: "/manual",
            icon: <BookOpen className="size-4" />,
          },
          {
            title: "Developer Docs",
            description: "API, concepts & self-hosting",
            url: "/quickstart",
            icon: <Code2 className="size-4" />,
          },
        ],
      }}
    >
      {children}
    </DocsLayout>
  );
}
