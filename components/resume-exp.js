import MarkdownContent from './markdown-content';

export default function Experience({ exp, ...props }) {
	return (
		<div {...props}>
			<div>{exp.title}</div>
			<div>{exp.company}</div>
			<div>
				<span>{`${exp.fromTime} - ${exp.toTime}`}</span>
				<span>{exp.location}</span>
			</div>
			<MarkdownContent content={exp.content}/>
		</div>
	)
}