import Head from 'next/head';

const siteInfo = {
  title: `Magicbell's Website`,
  description: "Welcome to Magicbell's Website, a place where you will know more about me from my professional experience and technical posts.",
  image: require('@images/avatar.jpg'),
  color: '#ef4444'
}

export default function Meta() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color={siteInfo.color}
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content={siteInfo.color} />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content={siteInfo.color} />
      {/* <link rel="alternate" type="application/rss+xml" href="/feed.xml" /> */}

      <title>{siteInfo.title}</title>
      <meta name="description" content={siteInfo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteInfo.title} />
      <meta property="og:url" content='/' />
      <meta property="og:description" content={siteInfo.description}/> 
      <meta property="og:image" content={siteInfo.image} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={siteInfo.title} />
      <meta name="twitter:description" content={siteInfo.description} />
      <meta name="twitter:image" content={siteInfo.image} /> 


    </Head>
  )
}
