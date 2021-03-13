import DateFormatter from './date-formatter';
import MarkdownContent from './markdown-content';
import Link from 'next/link';
import Image from 'next/image';
import { Dot } from './segment'

export default function PostCard({ post }) {
	let title = post.title;
	if (post.locale === 'en') {
		title = title.split(' ').slice(0, 5).join(' ');
		if (title !== post.title) {
			title += '...';
		}
	}

	return (
		<div className="relative h-60 border rounded border-theme-border cursor-pointer hover:shadow-md p-2">
			<div className="absolute left-0 top-0 w-full h-24 bg-theme-bg">
			{
				post.ogImage && (
					<Image
						src={post.ogImage}
						alt=''
						// className='opacity-60'
						layout='fill'
						objectFit='cover'
					/>
				) 
			}
			</div>
			<div className="relative h-20 mb-2 overflow-hidden">
				<p className="absolute bottom-0 text-lg text-left font-medium">
					{title}
				</p>
			</div>
			<div className="overflow-hidden h-24">
				<MarkdownContent content={post.excerpt} />
			</div>
			<div className="text-xs text-theme-meta absolute bottom-2 flex flex-col sm:flex-row sm:items-center">
        <DateFormatter dateString={post.date} />
        <Dot className="mx-2 border-theme-meta hidden sm:block"/>
        <span>{`${post.readTime}min read`}</span>
      </div>
			<Link href={`/posts/${post.slug}`}>
				<a className="absolute top-0 left-0 w-full h-full"></a>
			</Link>
		</div>
	)
}