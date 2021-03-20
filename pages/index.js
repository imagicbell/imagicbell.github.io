import Layout from '@/components/layout';
import Image from 'next/image';
import Meta from '@/components/meta'

export default function Index() {
  return (
    <div className="relative w-screen h-screen">
      <Meta />
      <Image 
        src="/assets/images/cover.jpg"
        layout="fill"
        objectFit="cover"
      />
      <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white'>
        <h3 className="italic">Hi, I'm</h3>
        <h1 className="text-8xl">LING MAO</h1>
        <h3>a Frontend and Unity Developer</h3>
      </div>
    </div>
  )
}

