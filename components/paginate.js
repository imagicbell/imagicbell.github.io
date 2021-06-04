import Link from 'next/link'

export default function Paginate({ pageCount, curPage, rootPath, subPath }) {
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

	let getUrl = index => {
		if (index === 1) {
			return rootPath;
		}
		return rootPath + subPath + "/" + index;
	}

	return (
		<div className={`h-8 border border-theme-border rounded flex text-theme-link`} style={{width: `${width}rem`}}>
			<style jsx>{`
				.paginate {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
				}
				.paginate:hover {
				}
				.prev-next {
					width: 5rem;
				}
				.page-num {
					width: 2.5rem;
				}
				.disabled {
					pointer-events: none;
					cursor: not-allowed;
				}
				.current {
					color: #fff;
				}
			`}</style>

			<Link href={getUrl(curPage - 1)}>
				<a className={`paginate hover:text-theme-link-highlight prev-next ${!enablePrev && 'disabled'}`}>Previous</a>	
			</Link>
			{
				pages.map(page => {
					let disabled_cn = (page === curPage || page === '...') ? 'disabled text-theme-link-disable' : '';
					let current_cn = page === curPage ? 'current bg-theme-link' : '';
					return (
						<Link key={page} href={getUrl(page)}>
							<a  className={`paginate hover:text-theme-link-highlight page-num border-l border-theme-border ${disabled_cn} ${current_cn}`}>{page}</a>
						</Link>
					)
				})
			}
			<Link href={getUrl(curPage + 1)}>
				<a className={`paginate hover:text-theme-link-highlight prev-next border-l border-theme-border ${!enableNext && 'disabled text-theme-link-disable'}`}>Next</a>
			</Link>
		</div>
	)
}