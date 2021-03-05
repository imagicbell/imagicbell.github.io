import { getAllPosts, getPostForPreview } from '../../lib/api';
import { BLOG_PAGINATE } from '../../lib/constants';
import { useRouter } from 'next/router';
import PostList from '../../components/post-list';

export default function Blog(props) {
	const router = useRouter();
	let page, category;
	if (!router.query.page) {
		page = 1;
	} else if (router.query.page[0] === 'page') {
		page = parseInt(router.query.page[1]);
	} else {
		category = router.query.page[0];
		page = router.query.page[1] ? parseInt(router.query.page[1]) : 1;
	}
	let pagePath = category ? `/blog/${category}/` : '/blog/page/';

	return <PostList curPage={page} pagePath={pagePath} {...props} />
}

export async function getStaticProps({ params }) {
	let page, category;
	if (!params.page) {
		page = 1;
	} else if (params.page[0] === 'page') {
		page = parseInt(params.page[1]);
	} else {
		category = params.page[0];
		page = params.page[1] ? parseInt(params.page[1]) : 1;
	}

	let posts = !category 
							? getAllPosts(['slug', 'date'])
							: getAllPosts(['slug', 'categories', 'date'])
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

function getPaths() {
	const posts = getAllPosts(['slug']);
	const pageCount = Math.ceil(posts.length / BLOG_PAGINATE);
	return new Array(pageCount).fill().map((_, index) => (
						{
							params: {
								page: (index === 0) ? false : ['page', `${index + 1}`],
							}
						}
					));
}

function getCategoryPaths() {
	return getAllPosts(['categories'])
					.reduce((acc, cur) => {
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
																		page: index === 0 
																					? [cur.category.toLowerCase()]
																					: [cur.category.toLowerCase(), `${index+1}`]
																	}
																}
															)));
					}, []);
}

export async function getStaticPaths() {
	return {
		paths: [...getPaths(), ...getCategoryPaths()],
		fallback: false
	}
}