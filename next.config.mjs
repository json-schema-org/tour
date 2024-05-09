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

  output:process.env.MODE === "local" ? "standalone" : "export",
  basePath:process.env.MODE === "local" ? "" : "/tour"

  

};

export default nextConfig;
