/** @type {import('next').NextConfig} */
const nextConfig = {
	
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      {
        test: /\.md$/,
        // This is the asset module.
        type: 'asset/source',
      }
    )
    return config
  },

  output:process.env.HOST !=="GitHub" ? "standalone" : "export",
  basePath:process.env.HOST !== "GitHub" ? "" : "/tour"
  

};

export default nextConfig;
