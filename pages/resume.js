import Head from 'next/head'
import Layout from '@/components/layout';
import { getAllExps } from '@/lib/api-resume';
import Experience from '@/components/resume-exp';
import markdownToHtml from '@/lib/markdownToHtml';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '@/components/sidebar';
import Link from 'next/link';

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

function Download() {
  return (
    <div className="absolute top-0 right-0 h-full">
      <Sidebar>
        <a href="/assets/resume/ling_resume.pdf" download
           className="flex text-theme-link hover:text-theme-link-highlight hover:underline">
          <FontAwesomeIcon className="h-6 mr-2" icon={faCloudDownloadAlt} />
          Resume
        </a>
      </Sidebar>
    </div>
  )
}

export default function Resume({ exps }) {
  return (
    <Layout>
      <HeadMeta />
      <div className="mx-auto py-4">
        <div className="flex items-center justify-center mb-16">
          <div className="w-1/4 md:w-40 h-1 bg-theme-bg-strong"/>
          <div className="text-xl md:text-3xl text-theme-link mx-4">My Journey</div>
          <div className="w-1/4 md:w-40 h-1 bg-theme-bg-strong"/>
        </div>
        {
          exps.map((exp, index) => (<Experience key={index} exp={exp}/>))
        }
      </div>
      <Download />
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