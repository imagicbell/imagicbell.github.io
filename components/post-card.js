import DateFormatter from './date-formatter';
import MarkdownContent from './markdown-content';
import Link from 'next/link';
import Image from 'next/image';

export default function PostCard({ post }) {
	return (
		<div className="relative h-60 border-solid border-2 rounded border-gray-200 cursor-pointer hover:shadow-md p-2">
			<div className="absolute left-0 top-0 w-full h-24 bg-gray-200">
			{
				post.ogImage && (
					<Image
						src={post.ogImage}
						alt=''
						className='shadow-sm'
						layout='fill'
						objectFit='cover'
					/>
				) 
			}
			</div>
			
			<div className="relative h-24">
				<p className="text-lg absolute bottom-4 text-left font-medium overflow-ellipsis">{post.title}</p>
			</div>
			<MarkdownContent content={post.abstract} />
			<DateFormatter dateString={post.date} />
			<Link href={`/posts/${post.slug}`}>
				<a className="absolute top-0 left-0 w-full h-full"></a>
			</Link>
		</div>
	)
}