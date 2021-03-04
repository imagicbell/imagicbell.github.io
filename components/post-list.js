import Layout from './layout'
import Container from './container'
import PostPreview from './post-preview'
import Paginate from './paginate'


export default function PostList({ posts, pageCount, curPage, pagePath }) {
	return (
		<Layout>
      <Container>
				<div className="max-w-3xl ml-16 py-20">
					<div className='mb-16'>
					{
						posts.map(post => (
							<PostPreview key={post.slug} post={post} />
						))
					}
					</div>
					<Paginate pageCount={pageCount} curPage={curPage} pagePath={pagePath}/>
				</div>
			</Container>
		</Layout>
	)
}