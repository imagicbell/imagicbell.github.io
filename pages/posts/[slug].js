import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostHeader from '@/components/post-header'
import PostBody from '@/components/post-body'
import PostFooter from '@/components/post-footer'
import Layout from '@/components/layout'
import { getPostBySlug, getAllPosts, extractPostExcerpt } from '@/lib/api'
import PostTitle from '@/components/post-title'
import Head from 'next/head'
import markdownToHtml from '@/lib/markdownToHtml'
import { MORE_POST_NUM, EXCERPT_LENGTH_CARD, EXCERPT_LENGTH_CN_CARD } from '@/lib/constants'

function HeadMeta({ post }) {
  return (
    <Head>
      <title>{post.title}</title>
      <meta name="description" content={post.description || ''} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={post.title} />
      <meta property="og:url" content={`${process.env.baseUrl}/posts/${post.slug}`} />
      <meta property="og:description" content={post.description || ''} /> 
      <meta property="og:image" content={ !post.ogImage ? '' : `${process.env.baseUrl}${post.ogImage}`} /> 
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.description || ''} /> 
      <meta name="twitter:image" content={ !post.ogImage ? '' : `${process.env.baseUrl}${post.ogImage}`} /> 

      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossOrigin="anonymous"></link>
      <script defer src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js" integrity="sha384-g7c+Jr9ZivxKLnZTDUhnkOnsh30B4H0rpLUpJ4jAIKs4fnJI+sEnkvrMWph2EDg4" crossOrigin="anonymous"></script>
    </Head>
  )
}

export default function Post({ post, postNav, morePosts }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <> 
          <HeadMeta post={post} />
          <div className="mx-auto">
            <article className="mb-20">
              <PostHeader post={post}/>
              <PostBody content={post.content} />
            </article>
            <PostFooter post={post} postNav={postNav} morePosts={morePosts} />
          </div>
        </>
      )}
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
    'categories',
    'readTime',
    'content',
  ]);
  const postContent = await markdownToHtml(post.content || '')

  const allPosts = getAllPosts(['slug', 'date', 'categories']);
  let index = allPosts.findIndex(p => p.slug === post.slug);
	let previous = index === allPosts.length-1 ? null : allPosts[index+1]; 
	let next = index === 0 ? null : allPosts[index-1];
  
  let morePosts = allPosts.filter(p => p.slug !== post.slug && p.categories.find(cat => post.categories.includes(cat)))
                          .slice(0, MORE_POST_NUM);
  index = 0;
  while (index < allPosts.length && morePosts.length < MORE_POST_NUM) {
    while(index < allPosts.length && (allPosts[index].slug === post.slug || morePosts.find(p => p.slug === allPosts[index].slug))) {
      index++;
    }
    if (index >= allPosts.length) {
      break;
    }
    morePosts.push(allPosts[index]);
  }
  morePosts = morePosts.map(p => {
    let detailPost = getPostBySlug(p.slug, [
      'slug',
      'title',
      'date',
      'locale',
      'ogImage',
      'excerpt',
      'readTime',
      'content',
    ]);
    if (detailPost.excerpt === undefined) {
      detailPost.excerpt = extractPostExcerpt(detailPost, { en: EXCERPT_LENGTH_CARD, cn: EXCERPT_LENGTH_CN_CARD });
    }
    delete detailPost.content;
    return detailPost;
  });

  return {
    props: {
      post: {
        ...post,
        content: postContent,
      },
      postNav: {
        previous: previous && `/posts/${encodeURIComponent(previous.slug)}`,
        next: next && `/posts/${encodeURIComponent(next.slug)}`
      },
      morePosts,
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
