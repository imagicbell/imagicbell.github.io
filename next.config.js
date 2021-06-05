const prod = process.env.NODE_ENV === "production";
const basePath = ""; 

const prodConfig = {
  basePath: basePath,
  env: {
    basePath: basePath,
    domain: "https://imagicbell.github.io",
  }
}

const devConfig = {
  env: {
    basePath: '',
    domain: "http://localhost:3000"
  }
};

const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  optimizeImagesInDev: true,

  ...(prod ? prodConfig : devConfig),
});