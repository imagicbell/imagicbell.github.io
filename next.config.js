const prod = process.env.NODE_ENV === "production";
const basePath = ""; 

const prodConfig = {
  basePath: basePath,
  images: {
    loader: 'imgix',
    path: "https://imagicbell.github.io",  
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
  // async rewrites() {
  //   return [
  //     {
  //       source: '/blog/page/1',
  //       destination: '/blog'
  //     },
  //     {
  //       source: '/blog/:category/1',
  //       destination: '/blog/:category'
  //     },
  //   ]
  // },
}