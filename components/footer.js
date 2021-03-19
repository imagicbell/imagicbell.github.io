import SiteNav from './site-nav';
import SocialLink from './social-link';
import { Settings } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="w-full bg-theme-bg-strong px-container py-4 text-theme-bg-strong-text flex flex-col items-center">
      <SiteNav showHome={true} />
      <div className="w-full my-2 flex flex-col sm:flex-row justify-between">
        <div className="text-xs">
          {'© 2021 Ling Mao. Powered by '}
          <a className="hover:underline" href="https://reactjs.org/" rel="nofollow">React</a>
          {' & '}
          <a className="hover:underline" href="https://nextjs.org/" rel="nofollow">Next.js</a>
          .
        </div>
        <div className="flex justify-center sm:justify-end items-center">
          <SocialLink inverse color="#fff" />
        </div>
      </div>
    </footer>
  )
}
