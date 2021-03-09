import SiteNav from './site-nav';
import Share from './share';
import { Settings } from '../lib/constants';

export default function Footer() {
  return (
    <footer className="w-full bg-theme-bg-strong px-container py-4 text-theme-bg-strong-text flex flex-col items-center">
      <SiteNav />
      <div className="w-full my-2 flex flex-col sm:flex-row justify-between">
        <div className="text-xs">
          {'© 2021 Ling Mao. Powered by '}
          <a className="hover:underline" href="https://reactjs.org/" rel="nofollow">React</a>
          {' & '}
          <a className="hover:underline" href="https://nextjs.org/" rel="nofollow">Next.js</a>
          .
        </div>
        <div className="flex justify-center sm:justify-end items-center">
          <Share size={28} meta={{
            path: '',
            title: "Magicbell's Website" ,
            image: Settings.author.coverImage,
          }} />
        </div>
      </div>
    </footer>
  )
}
