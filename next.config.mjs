/** @type {import('next').NextConfig} */

import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const isTurbo = process.argv.includes("--turbo");

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "metadata" }],
    ],
  },
});

// Merge MDX config with Next.js config

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "export",
  images: { unoptimized: true },

  // Completely disable webpack features when using turbopack
  webpack: isTurbo ? () => ({}) : undefined,

  compiler: isTurbo
    ? undefined
    : {
        styledComponents: true,
        emotion: true,
      },

  experimental: {
    turbo: {
      rules: {
        "*.mdx": ["@next/mdx"],
      },
      externalPackages: [
        "@emotion/react",
        "@emotion/styled",
        "@emotion/cache",
      ],
    },

    // Avoid externalizing packages that are ESM-only (like next-mdx-remote)
    // so they are bundled instead of being required at runtime.
    serverComponentsExternalPackages: [],
  },
};

export default withMDX(nextConfig);
