import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

// Metadata asset URLs are not auto-prefixed with basePath by Next, so do it here.
const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Carbon Documentation",
  description: "Open Source Manufacturing ERP Documentation",
  icons: {
    icon: [
      { url: `${assetPrefix}/favicon.svg`, type: "image/svg+xml" },
      {
        url: `${assetPrefix}/favicon-96x96.png`,
        sizes: "96x96",
        type: "image/png",
      },
    ],
    apple: `${assetPrefix}/apple-touch-icon.png`,
  },
  manifest: `${assetPrefix}/site.webmanifest`,
};

interface LayoutProps {
  children: React.ReactNode;
}

// Static search index lives at `${basePath}/api/search`. basePath is "" for the
// normal server build and e.g. "/carbon-manual" for a sub-path static deploy.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" className={geist.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            options: {
              type: "static",
              api: `${basePath}/api/search`,
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
