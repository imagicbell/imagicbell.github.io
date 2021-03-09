import Image from 'next/image';
import { Settings } from '../lib/constants';
import SocialLink from './social-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

function Full({ name, bio, avatar, location, links }) {
  return (
    <div className="border border-solid border-theme-border rounded shadow-sm flex flex-col">
      <div className="px-20 mt-6">
        <Image
          className="rounded-full"
          src={avatar}
          alt=''
          layout='responsive'
          width={180}
          height={180}
        />
      </div>
      <div className="m-6">
        <div className="text-xl font-semibold">{name}</div>
        <div className="mt-2">{bio}</div>
        <div className="mt-3 text-theme-meta flex items-center">
          <FontAwesomeIcon className="h-5 mr-2" icon={faMapMarkerAlt} />
          {location}
        </div>
        <div className="mt-3 flex items-center">
          <SocialLink />
        </div>
      </div>
    </div>
  )
}

function Small({ avatar, links }) {
  return (
    <div className="flex flex-col items-center" >
      <div className="w-full">
        <Image
          className="rounded-full"
          src={avatar}
          alt=''
          layout='responsive'
          width={60}
          height={60}
        />
      </div>
      {/* <div className="flex flex-col items-center">
        {
          links.map((link, id) => (
            <div key={id}>
              <div className="w-0.5 h-2 bg-theme-bg"></div> 
              <a href={link.href}>
                <FontAwesomeIcon className="h-6" style={{color: link.color}} icon={link.icon}/>
              </a>
            </div>
          ))
        }
      </div> */}
    </div>
  )
} 

export default function Author({ style }) {
  const info = {
    name: Settings.author.name,
    bio: Settings.author.bio,
    avatar: Settings.author.avatar,
    location: Settings.author.location,
  };

  return (
    style === 'small' 
    ? <Small {...info} />
    : <Full {...info} />
  )
}
