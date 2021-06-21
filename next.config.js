const prod = process.env.NODE_ENV === "production";

const prodConfig = {
  // basePath: basePath,
  env: {
    baseUrl: "https://imagicbell.github.io",
  }
}

const devConfig = {
  env: {
    baseUrl: "http://localhost:3000"
  }
};

const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  optimizeImagesInDev: true,

  ...(prod ? prodConfig : devConfig),
});