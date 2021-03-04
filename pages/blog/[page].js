import { getAllPosts, getPostBySlug, extractPostAbstract } from '../../lib/api';
import { BLOG_PAGINATE, ABSTRACT_LENGTH_PREVIEW, ABSTRACT_LENGTH_CN_PREVIEW } from '../../lib/constants';
import Layout from '../../components/layout'
import Container from '../../components/container'
import PostPreview from '../../components/post-preview'
import Paginate from '../../components/paginate'
import { useRouter } from 'next/router';

export default function Blog({ posts, pageCount }) {
	const router = useRouter();
	const curPage = parseInt(router.asPath.slice('/blog/page'.length));

	return (
		<Layout>
      <Container>
				<div className="max-w-3xl ml-16 py-20">
					<div className='mb-16'>
					{
						posts.map(post => (
							<PostPreview key={post.slug} post={post} />
						))
					}
					</div>
					<Paginate pageCount={pageCount} curPage={curPage} />
				</div>
			</Container>
		</Layout>
	)
}

export async function getStaticProps({ params }) {
	const page = parseInt(params.page.slice(4));
	let posts = getAllPosts(['slug', 'date']);
	const pageCount = Math.ceil(posts.length / BLOG_PAGINATE);
	posts = posts.slice((page - 1) * BLOG_PAGINATE, page * BLOG_PAGINATE)
							 .map(p => {
								let post = getPostBySlug(p.slug, [
									'slug',
									'title',
									'date',
									'locale',
									'ogImage',
									'categories',
									'abstract',
									'content',
									'readTime'
								]);
								if (post.abstract === undefined) {
									post.abstract = extractPostAbstract(post, { en: ABSTRACT_LENGTH_PREVIEW, cn: ABSTRACT_LENGTH_CN_PREVIEW });
								}
								delete post.content;
								return post;
							 });
	return {
		props: {
			posts,
			pageCount,
		}
	}	
}

export async function getStaticPaths() {
	const posts = getAllPosts(['slug']);
	const pageCount = Math.ceil(posts.length / BLOG_PAGINATE);
	return {
		paths: new Array(pageCount).fill().map((_, index) => (
			{
				params: {
					page: `page${index + 1}`,
				}
			}
		)),
		fallback: false
	}
}