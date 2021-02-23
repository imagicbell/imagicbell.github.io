const prod = process.env.NODE_ENV === "production";
const basePath = '/imagicbell-website';

module.exports = prod ? 
{
  basePath: basePath,
  images: {
    loader: 'imgix',
    path: `https://imagicbell.github.io${basePath}/`,
  },
  env: {
    baseUrl: `https://imagicbell.github.io${basePath}`,
  }
} :
{
  env: {
    baseUrl: ''
  }
}
