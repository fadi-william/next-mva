const withSass = require("@zeit/next-sass");

module.exports = withSass({
  webpack(config, options) {
    const { dir, defaultLoaders } = options;

    // Configure TypeScript.
    config.resolve.extensions.push(".ts", ".tsx");
    config.module.rules.push({
      test: /\.+(ts|tsx)$/,
      include: [dir],
      exclude: /node_modules/,
      use: [
        defaultLoaders.babel,
        {
          loader: "awesome-typescript-loader",
          options: {
            transpileOnly: true
          }
        }
      ]
    });

    return config;
  }
});
