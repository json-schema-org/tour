/** @type {import('next').NextConfig} */

import createMDX from "@next/mdx";
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
	remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter,{name:"metadata"}]],
	
  },
});

// Merge MDX config with Next.js config

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  output: "export",
  basePath: process.env.MODE === "local" ? "" : "/tour",
  images: { unoptimized: true } 
};

export default withMDX(nextConfig);
