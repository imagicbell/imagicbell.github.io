const prod = process.env.NODE_ENV === "production";
const basePath = ""; 

const prodConfig = {
  basePath: basePath,
  images: {
    loader: 'imgix',
    path: basePath,  
  },
  env: {
    basePath: basePath,
    domain: "",
  }
}

const devConfig = {
  env: {
    basePath: '',
    domain: "http://localhost:3000"
  }
};

module.exports = {
  ...(prod ? prodConfig : devConfig),
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: '/blog/page1',
      },
    ]
  },
}