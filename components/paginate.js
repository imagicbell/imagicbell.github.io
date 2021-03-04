import Link from 'next/link'

export default function Paginate({ pageCount, curPage }) {
	let pages;
	if (pageCount <= 4) {
		pages = new Array(pageCount).fill().map((_, index) => index + 1);
	} else {
		pages = [curPage];
		if (curPage > 1) pages.unshift(curPage-1);
		if (curPage < pageCount) pages.push(curPage+1);
		if (curPage > 3) pages.unshift('...');
		if (curPage < pageCount - 2) pages.push('...');
		if (!pages.includes(1)) pages.unshift(1);
		if (!pages.includes(pageCount)) pages.push(pageCount);
	}

	const width = (pages.length + 4)*2.5;
	const enablePrev = curPage > 1;
	const enableNext = curPage < pageCount;

	return (
		<div className={`h-8 border border-gray-300 rounded flex`} style={{width: `${width}rem`}}>
			<style jsx>{`
				.paginate {
					display: flex;
					justify-content: center;
					align-items: center;
					color: #6b7280;
					height: 100%;
				}
				.prev-next {
					width: 5rem;
				}
				.page-num {
					width: 2.5rem;
				}
				.disabled {
					color: #9ca3af;
					pointer-events: none;
					cursor: not-allowed;
				}
				.current {
					color: #fff;
					background: #6b7280;
				}
			`}</style>

			<Link href={`/blog/page${curPage-1}`}>
				<a className={`paginate prev-next ${!enablePrev && 'disabled'}`}>Previous</a>	
			</Link>
			{
				pages.map(page => (
					<Link key={page} href={`/blog/page${page}`}>
						<a  className={`paginate page-num border-l border-gray-300 ${(page === curPage || page === '...') && 'disabled'} ${page === curPage && 'current'}`}>{page}</a>
					</Link>
				))
			}
			<Link href={`/blog/page${curPage+1}`}>
				<a className={`paginate prev-next border-l border-gray-300 ${!enableNext && 'disabled'}`}>Next</a>
			</Link>
		</div>
	)
}