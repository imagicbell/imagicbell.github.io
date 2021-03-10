export function Dot({ className }) {
	return <div className={`w-px h-px border rounded ${className}`}/>
}

export function Vr({ className }) {
	return <div className={`w-px ${className}`} />
}

export function Hr({ className }) {
	return <hr className={`border-theme-line ${className}`}/>
}