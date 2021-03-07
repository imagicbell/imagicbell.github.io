import PostPreview from './post-preview'
import Paginate from './paginate'


export default function PostList({ posts, pageCount, curPage, pagePath }) {
	return (
		<div className="max-w-2xl">
			<div className='mb-16'>
			{
				posts.map(post => (
					<PostPreview key={post.slug} post={post} />
				))
			}
			</div>
			<Paginate pageCount={pageCount} curPage={curPage} pagePath={pagePath}/>
		</div>
	)
}