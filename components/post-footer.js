import Link from 'next/link'

export default function PostFooter({ post, morePosts }) {
	let index = morePosts.findIndex(p => p.slug === post.slug);
	let previous = index === morePosts.length-1 ? null : morePosts[index+1]; 
	let next = index === 0 ? null : morePosts[index-1];

	return (
		<>
			{
				previous ? (
					<Link href={`/posts/${encodeURIComponent(previous.slug)}`}>
						<a>Previous</a>
					</Link>
				) : (
					<a aria-disabled>Previous</a>
				)
			}
			{
				next ? (
					<Link href={`/posts/${encodeURIComponent(next.slug)}`}>
						<a>Next</a>
					</Link>
				) : (
					<a aria-disabled>Next</a>
				)
			}
		</>
	)
}