import Link from 'next/link';
import SiteNav from './site-nav';


export default function Header() {
  return (
    <div className="w-full bg-theme-bg-strong flex justify-between items-end px-container py-4 text-theme-bg-strong-text">
      <h2 className="text-xl md:text-3xl font-bold tracking-tighter md:tracking-tight">
        <Link href="/">
          <a className="">Magicbell's Website</a>
        </Link>
      </h2>
      <SiteNav showHome={false} />
    </div>  
  )
}
