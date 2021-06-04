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
    domain: "https://imagicbell.github.io",
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
  async redirects() {
    return [
      {
        source: '/blog/page/1',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/:category/page/1',
        destination: '/blog/:category',
        permanent: true,
      },
    ]
  },
}