import { getAllPosts, getPostForPreview } from '@/lib/api';
import { Settings } from '@/lib/constants';
import { useRouter } from 'next/router';
import Head from 'next/head'
import PostList from '@/components/post-list';
import Layout from '@/components/layout'
import Sidebar from '@/components/sidebar';
import Author from '@/components/author';

function HeadMeta({ category }) {
	if (category) {
		category = category.split(/([\s\-])/)
											 .map(word => /[\s\-]/.test(word) ? word : word[0].toUpperCase() + word.slice(1))
											 .join('');
	}
	const title = `Magicbell's Blog${category ? ' - ' + category : ''}`;
	const desc = "Welcome to Magicbell's Website - see blog posts.";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc}/>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
			<meta property="og:description" content={desc}/>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={desc}/>
    </Head>
  )
}

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
	let [rootPath, subPath] = category ? [`/blog/${category}`, ''] : ['/blog', '/page'];

	return (
		<Layout>
			<HeadMeta category={category} />
			<div className='flex flex-row justify-between'>
				<div className="w-full lg:w-2/3">
					<PostList curPage={page} rootPath={rootPath} subPath={subPath} {...props} />
				</div>
				<div className="hidden lg:block lg:w-1/3 box-border ml-8">
					<Sidebar><Author style={'full'}/></Sidebar>
				</div>			
			</div>
		</Layout>
	)
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
	const pageCount = Math.ceil(posts.length / Settings.blogPaginate);
	posts = posts.slice((page - 1) * Settings.blogPaginate, page * Settings.blogPaginate)
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
	const pageCount = Math.ceil(posts.length / Settings.blogPaginate);
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
						let pageCount = Math.ceil(cur.postCount / Settings.blogPaginate);
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