import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import MarkdownContent from './markdown-content';
import { Dot } from './segment';
import Image from 'next/image'

export default function Experience({ exp, ...props }) {
	return (
		<div {...props} 
				 data-aos="fade-up"
				 className="flex items-start flex-col md:flex-row mb-16">
			<div className="px-12 pb-4 w-full md:w-1/3 lg:w-5/12 flex justify-center md:justify-end">
				<Image 
					className="rounded-2xl"
					src={exp.logo}
					layout="intrinsic"
					width={200}
					height={200}
				/>
			</div>
			<div className="w-full md:w-2/3 lg:w-7/12">
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