import Link from 'next/link'

const navLinks = [
  { title: 'Blog', path: '/blog'},
  { title: 'Resume', path: '/resume'},
  { title: 'Contact', path: '/contact'}
]

export default function Header() {
  return (
    <div className="box-border w-full bg-theme-bg flex justify-between items-center px-container py-4 text-theme-bg-text">
      <h2 className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter">
        <Link href="/">
          <a className="hover:text-theme-bg-text-highlight">Magicbell's Website</a>
        </Link>
      </h2>
      <nav className="flex justify-end items-center">
        {
          navLinks.map(link => (
            <Link key={link.title} href={link.path}>
              <a className="hover:text-theme-bg-text-highlight ml-4">{link.title}</a>
            </Link>
          ))
        }
      </nav>
    </div>  
    
  )
}
