import Head from 'next/head'
import Layout from '@/components/layout';
import { getAllExps } from '@/lib/api-resume';
import Experience from '@/components/resume-exp';
import markdownToHtml from '@/lib/markdownToHtml'

function HeadMeta({ resume }) {
  return (
    <Head>
      {/* <title>{post.title}</title>
      { post.description && <meta name="description" content={post.description}/> }
      <meta property="og:type" content="website" />
      <meta property="og:title" content={post.title} />
      <meta property="og:url" content={`/posts/${post.slug}`} />
      { post.description && <meta property="og:description" content={post.description}/> }
      { post.ogImage && <meta property="og:image" content={post.ogImage} /> }
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={post.title} />
      { post.description && <meta name="twitter:description" content={post.description} /> }
      { post.ogImage && <meta name="twitter:image" content={post.ogImage} /> } */}
    </Head>
  )
}

export default function Resume({ exps }) {
  return (
    <Layout>
      <HeadMeta />
      <div className="mx-auto">
        <div>My Journey</div>
        {
          exps.map((exp, index) => (<Experience key={index} exp={exp}/>))
        }
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const exps = await Promise.all(
                        getAllExps()
                        .map(async exp => {
                          let html = await markdownToHtml(exp.content);
                          return {
                            ...exp,
                            content: html
                          }
                        }));
  return {
    props: {
      exps,
    }
  }
}