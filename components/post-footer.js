import Link from 'next/link';
import { useRouter } from 'next/router';
import { DiscussionEmbed } from 'disqus-react';
import { 
	FacebookShareButton, FacebookIcon,
	TwitterShareButton, TwitterIcon,
	LinkedinShareButton, LinkedinIcon,
	WeiboShareButton, WeiboIcon
} from 'react-share';
import PostCard from './post-card';

function PostNav({ postNav }) {
	return (
		<div className="flex leading-6 font-medium text-lg">
			{
				postNav.previous && 
					<Link href={postNav.previous}>
						<a className="flex mr-8 transition-colors duration-200 hover:text-gray-500">
							<span aria-hidden className="mr-2">←</span>
							Previous Post
						</a>
					</Link>
			}
			{
				postNav.next &&
					<Link href={postNav.next}>
						<a className="flex text-right ml-auto transition-colors duration-200 hover:text-gray-500">
							Next Post
							<span aria-hidden className="ml-2">→</span>
						</a>
					</Link>
			}
		</div>
	)
}

function PostShare({ post }) {
	const shareUrl = `${process.env.domain}${process.env.basePath}/posts/${post.slug}`;
	const size = 40;
	return (
		<div className="flex leading-6 justify-center">
			<FacebookShareButton className="mr-3 ml-3" url={shareUrl} quote={post.title} >
				<FacebookIcon size={size} round />
			</FacebookShareButton>
			<TwitterShareButton className="mr-3 ml-3" url={shareUrl} title={post.title} >
				<TwitterIcon size={size} round />
			</TwitterShareButton>
			<LinkedinShareButton className="mr-3 ml-3" url={shareUrl} >
				<LinkedinIcon size={size} round />
			</LinkedinShareButton>
			<WeiboShareButton className="mr-3 ml-3" url={shareUrl} title={post.title} image={post.ogImage && `${process.env.domain}${process.env.basePath}${post.ogImage}`}>
				<WeiboIcon size={size} round />
			</WeiboShareButton>
		</div>
	)
}	

function PostDisqus({ post }) {
	return (
		<DiscussionEmbed
			shortname='https-imagicbell-github-io'
			config={
				{
						url: `/posts/${post.slug}`,
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
		<div>
			<h2 className="text-xl font-medium leading-tight md:leading-none mb-6 text-center">MORE FROM THE BLOG</h2>
			<div className="grid grid-flow-row grid-cols-2 grid-rows-2 lg:grid-cols-4 gap-4">
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
			<hr className="border-gray-200 mt-6 mb-6"/>
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