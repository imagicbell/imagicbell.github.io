import { Settings } from '@/lib/constants';
import SocialLink from './social-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

function Full({ name, bio, avatar, location, links }) {
  return (
    <div className="border border-solid border-theme-border rounded shadow-sm flex flex-col">
      <div className="px-20 mt-6">
        <img
          className="object-cover rounded-full" 
          src={avatar} 
          alt="" 
          width="180"
          height="180"
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

export default function Author({ style }) {
  const info = {
    name: Settings.author.name,
    bio: Settings.author.bio,
    avatar: Settings.author.avatar,
    location: Settings.author.location,
  };

  return <Full {...info} />
}
