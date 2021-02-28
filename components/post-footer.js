import Link from 'next/link'

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

export default function PostFooter({ post, morePosts }) {
	return (
		<>
			<PostNav post={post} morePosts={morePosts} />
		</>
	)
}