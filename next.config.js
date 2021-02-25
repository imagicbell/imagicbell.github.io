const prod = process.env.NODE_ENV === "production";
const basePath = ""; 

module.exports = prod ? 
{
  basePath: basePath,
  images: {
    loader: 'imgix',
    path: basePath,  
  },
  env: {
    basePath: basePath
  }
} : 
{
  env: {
    basePath: ''
  }
};