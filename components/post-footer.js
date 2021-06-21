import Link from 'next/link';
import { useRouter } from 'next/router';
import { DiscussionEmbed } from 'disqus-react';
import PostCard from './post-card';
import { Hr } from './segment';
import Share from './share';

function PostNav({ postNav }) {
	return (
		<div className="flex leading-6 font-medium text-lg">
			{
				postNav.previous && 
					<Link href={postNav.previous}>
						<a className="flex mr-8 transition-colors duration-200 text-theme-link hover:text-theme-link-highlight">
							<span aria-hidden className="mr-2">←</span>
							Previous Post
						</a>
					</Link>
			}
			{
				postNav.next &&
					<Link href={postNav.next}>
						<a className="flex text-right ml-auto transition-colors duration-200 text-theme-link hover:text-theme-link-highlight">
							Next Post
							<span aria-hidden className="ml-2">→</span>
						</a>
					</Link>
			}
		</div>
	)
}

function PostShare({ post }) {
	const meta = {
		path: `/posts/${post.slug}`,
		title: post.title,
		image: post.ogImage
	};

	return (
		<div className="flex leading-6 justify-center">
			<Share size={40} meta={meta} />
		</div>
	)
}	

function PostDisqus({ post }) {
	return (
		<DiscussionEmbed
			shortname='https-imagicbell-github-io'
			config={
				{
						url: `${process.env.baseUrl}/posts/${post.slug}`,
						identifier: post.slug,
						title: post.title,
						language: 'en' 
				}
			}
		/>
	)
}

function PostMore({ morePosts }) {
	return (
		<div className="pt-4 pb-6">
			<h2 className="text-xl font-medium leading-tight md:leading-none mb-6 text-center">MORE FROM THE BLOG</h2>
			<div className="grid grid-flow-row grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 gap-4">
				{ 
					morePosts.map(post => (
						<PostCard key={post.slug} post={post} />
					)) 
				}
			</div>
		</div>
	)
}

function Section({ children }) {
	return (
		<div>
			<Hr className="mt-6 mb-6"/>
			{ children }
		</div>
	)
}

export default function PostFooter({ post, postNav, morePosts }) {
	return (
		<div>
			<div className="max-w-3xl mx-auto">
				<Section><PostShare post={post} /></Section>
				<Section><PostNav postNav={postNav} /></Section>
				<Section><PostDisqus post={post} /></Section>
			</div>
			<div className="max-w-5xl mx-auto">
				<Section><PostMore morePosts={morePosts} /></Section>
			</div>
		</div>
		
	)
}