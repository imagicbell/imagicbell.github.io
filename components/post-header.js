import DateFormatter from './date-formatter'
import PostTitle from './post-title'
import { Hr } from './segment'

export default function PostHeader({ title, date }) {
  return (
    <div className="max-w-4xl mx-auto mb-20">
      <PostTitle>{title}</PostTitle>
      <DateFormatter className="text-lg text-theme-meta"  dateString={date} />
      <Hr className="mt-2"/>
    </div>
  )
}
