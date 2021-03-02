import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'

export default function PostHeader({ title, date }) {
  return (
    <div className="max-w-4xl mx-auto mb-20">
      <PostTitle>{title}</PostTitle>
      {/* <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} height={620} width={1240} />
      </div> */}
      <div className="text-lg">
        <DateFormatter dateString={date} />
      </div>
      <hr className="border-gray-200"/>
    </div>
  )
}
