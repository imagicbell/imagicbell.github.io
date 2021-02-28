import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostHeader from '../../components/post-header'
import PostBody from '../../components/post-body'
import PostFooter from '../../components/post-footer'
import Header from '../../components/header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import markdownToHtml from '../../lib/markdownToHtml'

export default function Post({ post, morePosts }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{post.title}</title>
                { post.description && <meta name="description" content={post.description}/> }
                <meta property="og:type" content="website" />
                <meta property="og:title" content={post.title} />
                <meta property="og:url" content={router.asPath} />
                { post.description && <meta property="og:description" content={post.description}/> }
                { post.ogImage && <meta property="og:image" content={post.ogImage} /> }
                <meta name="twitter:title" content={post.title} />
                { post.description && <meta name="twitter:description" content={post.description} /> }
                { post.ogImage && <meta name="twitter:image" content={post.ogImage} /> }

                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossOrigin="anonymous"></link>
                <script defer src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js" integrity="sha384-g7c+Jr9ZivxKLnZTDUhnkOnsh30B4H0rpLUpJ4jAIKs4fnJI+sEnkvrMWph2EDg4" crossOrigin="anonymous"></script>
              </Head>
              <PostHeader
                title={post.title}
                date={post.date}
              />
              <PostBody content={post.content} />
            </article>
            <PostFooter post={post} morePosts={morePosts} />
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'description',
    'ogImage',
    'content',
  ])
  const content = await markdownToHtml(post.content || '')

  const allPosts = getAllPosts(['slug', 'date']);

  return {
    props: {
      post: {
        ...post,
        content,
      },
      morePosts: allPosts
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
