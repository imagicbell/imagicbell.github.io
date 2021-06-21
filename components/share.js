import { 
	FacebookShareButton, FacebookIcon,
	TwitterShareButton, TwitterIcon,
	LinkedinShareButton, LinkedinIcon,
	WeiboShareButton, WeiboIcon
} from 'react-share';

export default function Share({ size, meta }) {
	const shareUrl = `${process.env.baseUrl}${meta.path}`;
	const margin = `mx-${Math.floor(size/10)}`;
	return (
		<>
			<FacebookShareButton className={margin} url={shareUrl} quote={meta.title} >
				<FacebookIcon size={size} round />
			</FacebookShareButton>
			<TwitterShareButton className={margin} url={shareUrl} title={meta.title} >
				<TwitterIcon size={size} round />
			</TwitterShareButton>
			<LinkedinShareButton className={margin} url={shareUrl} title={meta.title} >
				<LinkedinIcon size={size} round />
			</LinkedinShareButton>
			<WeiboShareButton className={margin} url={shareUrl} title={meta.title} image={meta.image && `${process.env.baseUrl}${meta.image}`}>
				<WeiboIcon size={size} round />
			</WeiboShareButton>
		</>
	)
}