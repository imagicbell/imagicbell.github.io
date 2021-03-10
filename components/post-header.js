import DateFormatter from './date-formatter'
import PostTitle from './post-title'
import { Hr, Dot } from './segment'

export default function PostHeader({ post }) {
  return (
    <div className="max-w-4xl mx-auto mb-20">
      <PostTitle>{post.title}</PostTitle>
      <div className="text-base text-theme-meta flex items-center">
        <DateFormatter dateString={post.date} />
        <Dot className="mx-3 border-theme-meta"/>
        <span>{`${post.readTime}min read`}</span>
      </div>
      <Hr className="mt-2"/>
    </div>
  )
}
