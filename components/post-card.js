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
						className='shadow-sm opacity-60'
						layout='fill'
						objectFit='cover'
					/>
				) 
			}
			</div>
			<div className="relative h-20 mb-2 overflow-hidden">
				<p className="absolute h-full text-lg text-left font-medium">
					{post.title}
				</p>
			</div>
			<div className="overflow-hidden h-24">
				<MarkdownContent content={post.abstract} />
			</div>
			<DateFormatter className="text-sm text-gray-600 absolute bottom-2" dateString={post.date} />
			<Link href={`/posts/${post.slug}`}>
				<a className="absolute top-0 left-0 w-full h-full"></a>
			</Link>
		</div>
	)
}