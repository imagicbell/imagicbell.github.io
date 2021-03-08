import DateFormatter from './date-formatter'
import PostTitle from './post-title'

export default function PostHeader({ title, date }) {
  return (
    <div className="max-w-4xl mx-auto mb-20">
      <PostTitle>{title}</PostTitle>
      <div className="text-lg">
        <DateFormatter dateString={date} />
      </div>
      <hr className="border-theme-line"/>
    </div>
  )
}
