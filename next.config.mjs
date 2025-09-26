/** @type {import('next').NextConfig} */

import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

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
  compiler: {
    styledComponents: true,
  },
  
  // Turbopack configuration
  experimental: {
    turbo: {
      rules: {
        // Configure how Turbopack handles different file types
        '*.mdx': {
          loaders: ['@mdx-js/loader'],
          as: '*.js',
        },
      },
      resolveAlias: {
        // Add any necessary path aliases for Turbopack
        '@': './',
        '@/app': './app',
        '@/lib': './lib',
        '@/content': './content',
        '@/public': './public',
      },
    },
  },
};

export default withMDX(nextConfig);
