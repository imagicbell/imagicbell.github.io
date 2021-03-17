import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const resumeDir = join(process.cwd(), '_local/resume');

function getExpSlugs() {
	return fs.readdirSync(resumeDir)
					 .filter(fileName => /^\d+\-.+\.md$/.test(fileName))
					 .sort((a, b) => {
						 let ida = parseInt(a.slice(0, a.indexOf('-')));
						 let idb = parseInt(b.slice(0, b.indexOf('-')));
						 return b - a;
					 });
}

export function getExpBySlug(slug) {
	const fullPath = join(resumeDir, `${slug}`);
	const fileContent = fs.readFileSync(fullPath);
	const { data, content } = matter(fileContent);

	return {
		...data,
		content,
	}
}

export function getAllExps() {
	return getExpSlugs()
					.map(slug => getExpBySlug(slug));
}


