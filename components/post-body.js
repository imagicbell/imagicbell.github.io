import MarkdownContent from './markdown-content';

export default function PostBody({ content }) {
  return (
    <div className="max-w-3xl mx-auto">
      <MarkdownContent content={content}/>
    </div>
  )
}