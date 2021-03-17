import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Settings } from '@/lib/constants';

const links = [
	{ icon: faEnvelopeSquare, href: `mailto:${Settings.author.email}`, color: "rgb(239, 68, 68)" },
	{ icon: faLinkedin, href: `https://www.linkedin.com/in/${Settings.author.linkedin}`, color: "#007bb6"},
	{ icon: faGithub, href: `https://github.com/${Settings.author.github}`, color: "#24292e"}
]

export default function SocialLink() {
	return (
		<>
		{
			links.map((link, id) => (
				<a key={id} className="mr-2" href={link.href}>
					<FontAwesomeIcon className="h-6" icon={link.icon} color={link.color} />
				</a>
			))
		}
		</>
	)
}