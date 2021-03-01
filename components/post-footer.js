import Link from 'next/link';
import { useRouter } from 'next/router';
import { DiscussionEmbed } from 'disqus-react';
import { 
	FacebookShareButton, FacebookIcon,
	TwitterShareButton, TwitterIcon,
	LinkedinShareButton, LinkedinIcon,
	WeiboShareButton, WeiboIcon
} from 'react-share';

function PostNav({ post, morePosts }) {
	let index = morePosts.findIndex(p => p.slug === post.slug);
	let previous = index === morePosts.length-1 ? null : morePosts[index+1]; 
	let next = index === 0 ? null : morePosts[index-1];

	return (
		<div className="flex leading-6 font-medium text-lg">
			{
				previous && 
					<Link href={`/posts/${encodeURIComponent(previous.slug)}`}>
						<a className="flex mr-8 transition-colors duration-200 hover:text-gray-500">
							<span aria-hidden className="mr-2">←</span>
							Previous Post
						</a>
					</Link>
			}
			{
				next &&
					<Link href={`/posts/${encodeURIComponent(next.slug)}`}>
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
						url: `/post/${post.slug}`,
						identifier: post.slug,
						title: post.title,
						language: 'en' 
				}
			}
		/>
	)
}

function PostMore({ morePosts }) {

}

function Section({ children }) {
	return (
		<div className="">
			<hr className="border-gray-200 mt-6 mb-6"/>
			{ children }
		</div>
	)
}

export default function PostFooter({ post, morePosts }) {
	return (
		<div>
			<div className="max-w-3xl mx-auto">
				<Section><PostShare post={post} /></Section>
				<Section><PostNav post={post} morePosts={morePosts} /></Section>
				<Section><PostDisqus post={post} /></Section>
			</div>
			<div className="max-w-5xl mx-auto">

			</div>
		</div>
		
	)
}