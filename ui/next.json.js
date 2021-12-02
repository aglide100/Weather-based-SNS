// {
// wcMinify: false // it should be false by default
// }
const withPlugins = require("next-compose-plugins");
// const optimizedImages = require("next-optimized-images");

module.exports = withPlugins([
  {
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
  },
]);
