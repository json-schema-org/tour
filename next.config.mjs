/** @type {import('next').NextConfig} */

import createMDX from "@next/mdx";
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
/** @type {import('next').NextConfig} */

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
	remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
  },
});

// Merge MDX config with Next.js config

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  output: process.env.MODE === "local" ? "standalone" : "export",
  basePath: process.env.MODE === "local" ? "" : "/tour",
};

export default withMDX(nextConfig);
