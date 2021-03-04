import { getAllPosts, getPostBySlug, extractPostAbstract } from '../../lib/api';
import { BLOG_PAGINATE, ABSTRACT_LENGTH_PREVIEW, ABSTRACT_LENGTH_CN_PREVIEW } from '../../lib/constants';
import PostPreview from '../../components/post-preview'

export default function Blog({ posts }) {
	return (
		<div className="max-w-3xl p-8">
			{
				posts.map(post => (
					<PostPreview key={post.slug} post={post} />
				))
			}
		</div>
	)
}

export async function getStaticProps({ params }) {
	const page = parseInt(params.page.slice(4));
	let posts = getAllPosts(['slug', 'date'])
							.slice((page - 1) * BLOG_PAGINATE, page * BLOG_PAGINATE)
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
								]);
								if (post.abstract === undefined) {
									post.abstract = extractPostAbstract(post, { en: ABSTRACT_LENGTH_PREVIEW, cn: ABSTRACT_LENGTH_CN_PREVIEW });
								}
								delete post.content;
								return post;
							});
	return {
		props: {
			posts
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