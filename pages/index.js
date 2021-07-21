import Layout from '@/components/layout';
import Meta from '@/components/meta';
import Link from 'next/link';

export default function Index() {
  return (
    <div className="relative w-screen h-screen">
      <Meta />
      <img className="absolute left-0 top-0 w-full h-full object-cover" src={require('@images/cover.jpg?lqip')} alt=''/>
      <picture>
        <source srcSet={require('@images/cover.jpg?webp')} type="image/webp" />
        <img className="absolute left-0 top-0 w-full h-full object-cover"  src={require('@images/cover.jpg')} />
      </picture>
      <div className='absolute top-0 left-0 w-full h-1/2 flex flex-col items-center justify-center text-white'>
        <h3 className="italic font-rubik text-lg sm:text-xl">Hi, I'm</h3>
        <h1 className="font-rubik font-bold text-7xl sm:text-8xl">LING MAO</h1>
        <h3 className="font-noto font-medium text-lg sm:text-xl">a Frontend and Unity Developer</h3>
        <h3 className="my-4 font-noto font-medium text-base sm:text-lg text-gray-100">
          Here are my&nbsp;
          <Link href='/blog'>
            <a className="underline font-bold text-xl tracking-wide text-yellow-400 hover:text-yellow-500">{'Blog'}</a>
          </Link>
          &nbsp;and&nbsp; 
          <Link href='/resume'>
            <a className="underline font-bold text-xl tracking-wide text-yellow-400 hover:text-yellow-500">{'Resume'}</a>
          </Link>
          .
        </h3>
      </div>
    </div>
  )
}

