import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

// When BUILD_EXPORT=true we produce a fully static site (for GitHub Pages or any
// static host). NEXT_PUBLIC_BASE_PATH lets the site live under a sub-path such as
// "/carbon-manual". For the normal server build (e.g. docs.carbon.ms) neither is
// set, so behavior is unchanged.
const isExport = process.env.BUILD_EXPORT === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  ...(isExport
    ? {
        output: 'export',
        images: { unoptimized: true },
        trailingSlash: true,
        ...(basePath ? { basePath, assetPrefix: basePath } : {}),
      }
    : {
        async rewrites() {
          return [
            {
              // allow appending .mdx to any docs URL to fetch raw Markdown
              source: '/:path*.mdx',
              destination: '/llms.mdx/:path*',
            },
          ];
        },
      }),
};

export default withMDX(config);
