import 'github-markdown-css/github-markdown.css';
import markdownStyles from './markdown-styles.module.css';

export default function MarkdownContent({ content }) {
	return (
		<div
			className={`markdown-body ${markdownStyles.markdown}`}
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	)
}