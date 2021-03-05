import { getAllPosts, getPostForPreview } from '../../../lib/api';
import { useRouter } from 'next/router';
import PostList from '../../../components/post-list';
import { BLOG_PAGINATE } from '../../../lib/constants';

export default function BlogCategory(props) {
	const router = useRouter();
	const category = router.query.category;
	const curPage = !router.query.page ? 1 : parseInt(router.query.page[1]);

	return <PostList curPage={curPage} pagePath={`/blog/${category}/page/`} {...props} />
}

export async function getStaticProps({ params }) {
	const category = params.category;
	const page = !params.page ? 1 : parseInt(params.page[1]);
	let posts = getAllPosts(['slug', 'categories', 'date'])
								.filter(post => post.categories.find(cat => cat.toLowerCase() === category));
	const pageCount = Math.ceil(posts.length / BLOG_PAGINATE);
	posts = posts.slice((page - 1) * BLOG_PAGINATE, page * BLOG_PAGINATE)
								.map(post => getPostForPreview(post.slug));

	return {
		props: {
			posts,
			pageCount,
		}
	}						
}

export async function getStaticPaths() {
	const posts = getAllPosts(['categories']);
  return {
		paths: posts.reduce((acc, cur) => {
										cur.categories.forEach(cat => {
											let catInfo = acc.find(info => info.category === cat);
											if (!catInfo) {
												acc.push({ category: cat, postCount: 1});
											} else {
												catInfo.postCount++;
											}
										});
										return acc;
									}, [])
								.reduce((acc, cur) => {
									let pageCount = Math.ceil(cur.postCount / BLOG_PAGINATE);
									return acc.concat(new Array(pageCount).fill().map((_, index) => (
																			{
																				params: {
																					category: cur.category.toLowerCase(),
																					page: index === 0 ? false : ['page', `${index+1}`],
																				}
																			}
																		)));
									}, []),
		fallback: false
	}
}