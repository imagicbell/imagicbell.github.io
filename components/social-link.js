import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faEnvelopeSquare, } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Settings } from '@/lib/constants';

const links = [
	{ 
		icon: faEnvelopeSquare, 
		iconIn: faEnvelope,
		href: `mailto:${Settings.author.email}`, 
		color: "rgb(239, 68, 68)" 
	},
	{ 
		icon: faLinkedin, 
		iconIn: faLinkedinIn,
		href: `https://www.linkedin.com/in/${Settings.author.linkedin}`, 
		color: "#007bb6"
	},
	{ 
		icon: faGithub, 
		iconIn: faGithub,
		href: `https://github.com/${Settings.author.github}`, 
		color: "#24292e"
	}
]

export default function SocialLink({ inverse, color }) {
	return (
		<>
		{
			links.map((link, id) => (
				<a key={id} href={link.href} className="mr-4" >
					<FontAwesomeIcon 
						className="h-6" 
						icon={inverse ? link.iconIn : link.icon} 
						color={color ? color : link.color} 
					/>
				</a>
			))
		}
		</>
	)
}