import Link from 'next/link';
import { Vr } from './segment';
import { useRouter } from 'next/router';

const navLinks = [
	{ title: 'Home', path: '/'},
  { title: 'Blog', path: '/blog'},
  { title: 'Resume', path: '/resume'},
]

export default function SiteNav({ showHome }) {
	const router = useRouter();

	return (
		<nav className="text-base md:text-lg flex justify-end items-center">
			{
				navLinks.map((link, index) => {
					if (!showHome && index === 0) {
						return;
					}
					
					let cn = "border-b-2 border-theme-bg-strong-text border-opacity-0 hover:border-opacity-100 mx-2 md:mx-4";
					if (link.path === router.asPath) {
						cn += " border-opacity-100";
					}
					return (
						<Link key={link.title} href={link.path}>
							<a className={cn}>{link.title}</a>
						</Link>
					)
				})
			}
		</nav>
	)
}