import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import MarkdownContent from './markdown-content';
import { Dot } from './segment';

const expImages = {
	'triniti': require('@images/resume/triniti.jpg'),
	'com2ply': require('@images/resume/com2ply.jpg'),
	'putao': require('@images/resume/putao.jpg'),
	'gap': require('@images/resume/gap.jpg'),
}

export default function Experience({ exp, ...props }) {
	console.log(exp.slug)
	return (
		<div {...props} 
				 data-aos="fade-up"
				 className="flex items-start flex-col md:flex-row mb-16">
			<div className="px-12 pb-4 w-full md:w-1/3 flex justify-center md:justify-end">
				<img 
					className="rounded-2xl"
					src={expImages[exp.slug]}
					width={180}
					height={180}
				/>
			</div>
			<div className="w-full md:w-2/3 lg:mr-16">
				<div className="text-xl text-blue-500">{exp.title}</div>
				{exp.company && <div className="text-xl text-yellow-500">{exp.company}</div>} 
				<div className="flex items-center text-theme-meta mb-8">
					<span>{`${exp.time}`}</span>
					<Dot className="mx-4 border-theme-meta" />
					<FontAwesomeIcon className="h-4 mr-1" icon={faMapMarkerAlt} />
					<span>{exp.location}</span>
				</div>
				<MarkdownContent content={exp.content}/>
			</div>
		</div>
	)
}