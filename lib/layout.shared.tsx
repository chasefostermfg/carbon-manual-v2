import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Book, Github, Globe, MessageCircle, Video } from "lucide-react";

// Static assets must include the base path when the site is deployed under a
// sub-path (e.g. "/carbon-manual" on GitHub Pages). Empty for a root deploy.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}/logo.svg`}
            width={25}
            height={25}
            alt="Carbon Logo"
          />
          Carbon
        </>
      ),
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [
      {
        text: "API Docs",
        url: "https://app.carbon.ms/docs/api/js/intro",
        icon: <Book className="size-4" />,
      },
      {
        text: "GitHub",
        url: "https://github.com/crbnos/carbon",
        icon: <Github className="size-4" />,
      },
      {
        text: "Videos",
        url: "https://learn.carbon.ms",
        icon: <Video className="size-4" />,
      },
      {
        text: "Discord",
        url: "https://discord.gg/yGUJWhNqzy",
        icon: <MessageCircle className="size-4" />,
      },
      {
        text: "Website",
        url: "https://carbon.ms",
        icon: <Globe className="size-4" />,
      },
    ],
  };
}
