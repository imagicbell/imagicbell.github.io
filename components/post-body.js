import 'github-markdown-css/github-markdown.css';
import markdownStyles from './markdown-styles.module.css';

export default function PostBody({ content }) {
  return (
    <div className="mx-auto">
      <div
        className={`markdown-body ${markdownStyles.markdown}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}