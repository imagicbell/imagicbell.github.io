import { getAllPosts, getPostBySlug, extractPostAbstract } from '../../lib/api';
import { BLOG_PAGINATE, ABSTRACT_LENGTH_PREVIEW, ABSTRACT_LENGTH_CN_PREVIEW } from '../../lib/constants';
import { useRouter } from 'next/router';
import PostList from '../../components/post-list';

export default function Blog(props) {
	const router = useRouter();
	const curPage = router.query.page ? parseInt(router.query.page[1]) : 1;

	return <PostList curPage={curPage} pagePath='/blog/page/' {...props} />
}

export async function getStaticProps({ params }) {
	const page = !params.page ? 1 : parseInt(params.page[1]);
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
					page: (index === 0) ? false : ['page', `${index + 1}`],
				}
			}
		)),
		fallback: false
	}
}