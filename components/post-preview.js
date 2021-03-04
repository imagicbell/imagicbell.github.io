import DateFormatter from './date-formatter';
import MarkdownContent from './markdown-content'
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'

export default function PostPreview({ post }) {

  return (
    <div className="relative mb-8 border-solid border border-gray-300 rounded cursor-pointer shadow-sm hover:shadow-md">
      <Link href={`/posts/${post.slug}`}>
				<a className="absolute top-0 left-0 w-full h-full"></a>
			</Link>
      {
        post.ogImage && (
          <div className="relative h-80 w-full">
            <Image
              src={post.ogImage}
              alt=''
              layout='fill'
              objectFit='cover'
            />
          </div>
        )
      }
      <div className="ml-4 mr-4 mt-6 mb-6">
        <p className="text-xl text-left font-medium mb-4">
          {post.title}
        </p>
        <div className="mb-4" >
          <MarkdownContent content={post.abstract} />
        </div>
        <div className='text-gray-500 text-sm'>
          <DateFormatter dateString={post.date} />
          <span className='ml-4'>Time to Read</span>
        </div>
      </div>

      <div className='absolute right-4 bottom-6 flex justify-end items-center text-gray-500 text-sm'>
        <FontAwesomeIcon icon={faFolderOpen} />
        {
          post.categories.map(cat => (
            <Link href=''>
              <a className='ml-2 hover:underline hover:text-gray-700'>{cat}</a>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
